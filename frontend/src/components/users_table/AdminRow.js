import React from 'react';
import styles from './UsersTable.module.css';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function AdminRow({admin}) {

    const handleBirthDate = (birthDate) => {
        const birth_date_datetime_format = birthDate;
        const birth_date_datetime = new Date(birth_date_datetime_format);
        const birth_date = birth_date_datetime.toISOString().slice(0, 10);
        const birth_date_splitted = birth_date.split('-');
        const birth_date_new_format = birth_date_splitted[2] + "/" + birth_date_splitted[1] + "/" + birth_date_splitted[0];
        return <p>{birth_date_new_format}</p>;
    };


  return (
    <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        className={styles.row}
    >
        <TableCell component="th" scope="row">
          {admin.full_name}
        </TableCell>
        <TableCell align="left">{admin.username}</TableCell>
        <TableCell align="left">{admin.email}</TableCell>
        <TableCell align="left">{handleBirthDate(admin.birth_date)}</TableCell>
        <TableCell align="left">{admin.type_of_color_blindness}</TableCell>
    </TableRow>
  )
}

export default AdminRow