import React, {
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';

import Modal from '@/utils/UIs/Modal';
import BasicTable from '@/utils/UIs/Table';
import ViewIcon from '@/utils/UIs/ViewIcon';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';

import Cookies from 'universal-cookie';
import AddProduct from './AddProductModal';

const cookies = new Cookies();

export default function Product() {
  // curl - X 'GET' \
  // 'https://dev-api.digiex.asia/calobye-be-dev/api/orders/page?page_number=1&page_size=10&asc_sort=false' \
  // -H 'accept: */*' \
  // -H 'Auth-Token: 02d0a36b3dc4436d9cda4d072382c73f'
  const source: any = axios.CancelToken.source();

  const router: NextRouter = useRouter();
  const SearchProductInput: MutableRefObject<string | undefined | any> = useRef();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber]: any = useState(router.query.page);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [productsLength, setProductsLength] = useState(0);

  const offsets = {
    size: 5,
  };

  const tableHeader = [
    'Image',
    'Product name',
    'Price',
    'Create date',
    'Status',
    'Action',
  ];

  function createData(
    image: string,
    product_name: string,
    price: number,
    create_date: ReactNode,
    status: string,
  ) {
    return [
      {
        type: 'image',
        content: image,
      },
      product_name,
      price,
      create_date,
      status,
      <ViewIcon key={1} />,
    ];
  }

  async function fetchMyAPI(p: number | string | string[]) {
    setCallApiPending(true);

    return await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/product', {
        params: {
          asc_sort: 'false',
          page_number: p,
          page_size: offsets.size,
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
        cancelToken: source.token,
      })
      .then((data: any) => {
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.thumbnail,
              item.product_name,
              item.price,
              item.created_date,
              item.status,
            ),
          ),
        );
      })
      .catch((err) => {
        setProductsLength(0);
        setInstance([]);
        console.log(err);
      })
      .finally(() => {
        setCallApiPending(false);
      });
  }

  const searchProduct = () => {
    setCallApiPending(true);

    const call = async () => {
      return await axios
        .get(
          `https://dev-api.digiex.asia/calobye-be-dev/api/product/${SearchProductInput.current.value}`,
          {
            headers: {
              accept: '*/*',
              'Auth-Token': token,
            },
          },
        )
        .then((res: any) => {
          const { data } = res;
          setProductsLength(1);
          setInstance([
            createData(
              data.data.thumbnail,
              data.data.product_name,
              data.data.price,
              data.data.created_date,
              data.data.status,
            ),
          ]);
        })
        .catch((err) => {
          setProductsLength(0);
          setInstance([]);
          console.log(err);
        })
        .finally(() => {
          setCallApiPending(false);
        });
    };
    if (SearchProductInput.current.value != '') call();
    else {
      if (router.query.page) fetchMyAPI(router.query.page);
      else fetchMyAPI(1);
    }
  };

  useLayoutEffect(() => {
    setInstance([]);

    if (router.query.page) fetchMyAPI(router.query.page);
    else fetchMyAPI(1);
    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, [router.query]);

  return (
    <>
      <div className={`p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit`}>
          <h1 className={`font-bold mb-3`}>Product Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-60 first-letter:input-icons">
            <span className="icon" onClick={searchProduct}>
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search Product"
              ref={SearchProductInput}
            />
          </div>
          <div className="">
            <Modal
              component={<AddProduct />}
              action_name='+ Add Product'
              saveClick='save'
              width='75%'
            />
          </div>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'product'}
          />
        </div>

        <div className={`paginator-container`}>
          {pageNumber && (
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={productsLength}
              router={router}
              currentPath={'/product'}
            />
          )}
        </div>
      </div>
    </>
  );
}
