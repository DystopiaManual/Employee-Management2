import React, { useState } from 'react'
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

function EmployeeDelete(props) {
    
    const { stateRefresh, id, name } = props;
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }

    const deleteEmployee = (id) => {
      const url = '/api/employees/' + id;
      fetch(url, {
          // HTTP DELETE METHOD
          method: 'DELETE'
      })
      .then(response => response.json())
      .then(() => stateRefresh())
    }

    const handleDeleteClick = (id) => {
      if(window.confirm("정말 삭제하시겠습니까?")) {
        alert("삭제되었습니다.");
        deleteEmployee(id);
      } else {
        alert("취소되었습니다.");
      }
    }

  return (
    <div>
      <Button style={{ zIndex: 0 }} variant='contained' onClick={handleClickOpen}>삭제</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle onClose={handleClose}>
          사원정보 삭제
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <span className='delete-name'>{name}</span> 님을 정말 삭제하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={(e) => {deleteEmployee(id)}}>예</Button>
          <Button variant='outlined' onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EmployeeDelete