/* eslint-disable prettier/prettier */
import React from 'react';
import styles from '@/styles/Add.module.css';

import { FormGroup, TextField } from '@mui/material';
import Switches from '@/utils/UIs/Switches';

export default function AddAdmin() {
  return (
    <>
      <div className={`${styles.title}`}>
        <div className={`text-black`}>Category detail</div>
      </div>
      
      <FormGroup className={`${styles.content} grid justify-around text-black`}>
        <TextField fullWidth label="Category name" id="category" />
        <TextField fullWidth label="Parent category" id="category" />
        <Switches title="Active/Inactive" />
      </FormGroup>
    </>
  );
}
