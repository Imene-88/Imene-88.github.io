import React, { useEffect, useState } from 'react';
import styles from './UsersTable.module.css';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import axios from 'axios';
import AdminRow from './AdminRow';


function AdminsTable() {

    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        const getAllAdmins = async () => {
            try {
                const res = await axios.get("/admin/allAdmins");
                setAdmins(res.data); 
            } 
            catch (error) {
                console.log(error);
            }
        };
        getAllAdmins();
    }, []);

  return (
    <div className={styles.usersTable}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={styles.headerTitles}>Full name</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Username</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Email</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Birth date</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Type of color blindness</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => {
                return <AdminRow key={admin._id} admin={admin} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default AdminsTable