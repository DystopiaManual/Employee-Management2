import React, { useCallback } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Dialog, DialogActions, MenuItem, createTheme, tabClasses } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import { TextField } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles(theme => ({
  dialog: {
    border: 'none',
    width: '35vw',
    textAlign: 'center',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    overflow: 'hidden',
    maxWidth: '500px'
  },
  photoSelect: {
    textAlign: 'center',
    width: '50%',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  btnDesign: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    margin: "12px"
  }
}))

function EmployeeAdd(props) {

    const classes = useStyles();
    const today = new Date();   
    const year = today.getFullYear(); // 년도
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월
    const date = today.getDate();  // 날짜

    // -- MUI 테스트시작 --
    const YEAR_SELECT = [];
    const MONTH_SELECT = [];
    const DAY_SELECT = [];
    for (let i = 1999; i <= 2077; i++) {
      YEAR_SELECT.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      MONTH_SELECT.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      DAY_SELECT.push(i);
    }
    // -- MUI 테스트 끝 --

    const dateResult = year + '-' + month + '-' + date;

    const [file, setFile] = useState(null);
    const [NAME, setNAME] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [job, setJob] = useState('');
    const [position, setPosition]= useState('사원');
    const [joindate, setJoindate]= useState(dateResult);
    const [fileName, setFileName] = useState('');
    const [open, setOpen] = useState(false);
    


    const handleClickOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setFile(null)
      setNAME('')
      setBirthday('')
      setGender('')
      setJob('')
      setPosition('사원')
      setJoindate(dateResult)
      setFileName('')
      setOpen(false)
    }


    const stateRefresh = props.stateRefresh;
    const handleFormSubmit = (e) => {
        e.preventDefault();
        addEmployee()
          .then((response) => {
            stateRefresh();
          });
          setFile(null)
          setNAME('')
          setBirthday('')
          setGender('')
          setJob('')
          setPosition('사원')
          setJoindate(dateResult)
          setFileName('')
          setOpen(false)
          stateRefresh();
    }
    const handleFileChange = (e) => {
          setFile(e.target.files[0]);
          setFileName(e.target.value);
    }

    const handleValueChange = useCallback((e) => {
        switch (e.target.name) {
          case 'NAME':
            setNAME(e.target.value);
            break;
          case 'birthday':
            setBirthday(e.target.value);
            break;
          case 'gender':
            setGender(e.target.value);
            break;
          case 'job':
            setJob(e.target.value);
            break;
          case 'position':
            setPosition(e.target.value);
            break;
          case 'joindate':
            setJoindate(e.target.value);
            break;
          default:
            break;
        }
      }, [setNAME, setBirthday, setGender, setJob, setPosition, setJoindate])
    

    const addEmployee = () => {
    const url = '/api/employees';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('NAME', NAME);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('job', job);
    formData.append('POSITION', position);
    formData.append('joindate', joindate)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    return axios.post(url, formData, config);
  }
  

  return (
    
      <div>
        <Button variant="contained" style={{ backgroundColor: "rgb(82, 141, 207)" ,fontWeight: "bold",  }} onClick={handleClickOpen}>
          <img src='img/employee.png' alt='사원정보 추가버튼' className='emp-plus-btn'/>&nbsp;ADD
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className={classes.dialog} sx={{ margin: '8px 0' }}>사원정보 입력</DialogTitle>
          <DialogContent>
            <input className='hidden' accept="image/*" id='raised-button-file' type="file" file={file} value={fileName} onChange={handleFileChange}></input>
            <label htmlFor='raised-button-file'>
              <Button className={classes.photoSelect} sx={{ margin: '6px 0' }} variant='contained' color='primary' component="span" name="file">
                {fileName === "" ? "프로필 이미지 선택" : fileName}
              </Button>
            </label>
            <br/>
            <TextField fullWidth sx={{ margin: '6px 0'}} label="이름" type="text" name="NAME" defaultValue={NAME} onChange={handleValueChange}></TextField><br/>
            <TextField fullWidth sx={{ margin: '6px 0'}} label="생년월일" type='text' name='birthday' defaultValue={birthday} onChange={handleValueChange}></TextField><br/>
            <TextField fullWidth sx={{ margin: '6px 0'}} label="성별" type='text' name='gender' defaultValue={gender} onChange={handleValueChange}></TextField><br/>
            <TextField fullWidth sx={{ margin: '6px 0'}} label="직업" type='text' name='job' defaultValue={job} onChange={handleValueChange}></TextField><br/>
            <Select fullWidth sx={{ margin: '6px 0'}} label="직위" required="required" name='position' defaultValue={position} onChange={handleValueChange}>
                        <MenuItem disabled>직위를 선택해주세요.</MenuItem>
                        <MenuItem value="사원">사원</MenuItem>
                        <MenuItem value="주임">주임</MenuItem>
                        <MenuItem value="대리">대리</MenuItem>
                        <MenuItem value="과장">과장</MenuItem>
                        <MenuItem value="차장">차장</MenuItem>
                        <MenuItem value="부장">부장</MenuItem>
            </Select><br/>
            <div className='date-style'>
              입사날짜 : <input type='date'
                             id='joindate'
                             name='joindate'
                             max='2077-06-20'
                             min='1999-01-01'
                             defaultValue={dateResult}
                             onChange={handleValueChange}
                       ></input><br/>
            </div>
          </DialogContent>
          <DialogActions>
            <Button sx={{ margin: '6px'}} className={classes.btnDesign} variant='contained' color='primary' onClick={handleFormSubmit}>추가</Button>
            <Button sx={{ margin: '6px'}} className={classes.btnDesign} variant='outlined' color='primary' onClick={handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    
  )
}

export default EmployeeAdd