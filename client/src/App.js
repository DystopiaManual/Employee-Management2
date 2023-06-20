import * as React from 'react';
import './reset.css';
import './App.css';
import './main.css';
import Employee from './components/Employee';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import EmployeeAdd from './components/EmployeeAdd';
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: 0,
    width: 'auto',
  },
  maxWidth: '150px'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '9ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const [employees,setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  // api 로딩처리
  const [loading, setLoading] = useState(null);
  

  useEffect(() => {
    // 3. callApi함수를 실행하고 useState로 employee값 변경
    setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 출력

    callApi()
      .then(res => {
        setEmployees(res)
        // api 호출이 완료되면 false로 값 변경하여 숨김
        setLoading(false)
      })
      // 에러발생시 콘솔출력
      .catch(err => console.log(err));
  }, []);
  
  const stateRefresh = () => {
    setEmployees([])
    setSearchKeyword('')
    callApi()
      .then(res => {
        setEmployees(res)        
      })
      .catch(err => console.log(err));
  }

  const callApi = async () => {
    // 1. /api/customers 경로로접근
    const response = await fetch('/api/employees');
    // 2. 해당경로의 json데이터를 body에 담기
    const body = await response.json();
    return body;
  }

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  }


  const filteredComponents = (data, searchKeyword) => {
    
    if (!data) return <Loading /> // data가 없으면 로딩컴포넌트
    
    const filterData = data.filter((c) => {
      return c.NAME.indexOf(searchKeyword) > -1;
    })
    return filterData.map((c) => {
      return <Employee
               key={c.id}
                id={c.id}
                image={c.image}
                NAME={c.NAME}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                POSITION={c.POSITION}
                joindate={c.joindate}
                stateRefresh={stateRefresh}
              />
    })
  }

  return (
    <div className="App">
        {/* -------------------------------- */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                EMPLOYEE MANAGEMENT
              </Typography>
              <div className='icon-box'>
                <div>
                  <EmployeeAdd stateRefresh={stateRefresh}/>
                </div>
              </div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search.."
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={searchKeyword}
                  onChange={handleValueChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      <div className='list-wrap'>
        {/* <div className='header-bar'>
          <div className='header-text' style={{marginLeft: '10px'}}>
            MANAGEMENT SYSTEM
          </div>
          <div className='icon-box'>
            <div>
              <EmployeeAdd stateRefresh={stateRefresh}/>
            </div>
          </div>
        </div> */}
        <table>
          <thead className='thead'>
            <tr className='table-sticky'>
              <th>사원번호</th>
              <th>프로필사진</th>
              <th>이름</th>
              <th>생년월일</th>
              <th>성별</th>
              <th>직무</th>
              <th>직위</th>
              <th>입사일</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody className='tbody'>
              {/* {
                // employees의 값이 있을때 테이블 출력
                employees ? employees.map(c => {
                  return (
                    <Employee
                      key={c.id}
                      id={c.id}
                      image={c.image}
                      NAME={c.NAME}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}
                      POSITION={c.POSITION}
                      joindate={c.joindate}
                      stateRefresh={stateRefresh}
                    />    
                  )
                  // employees의 값이 없으면 공백 출력
                }) : <Loading/>
              } */}
              {
                filteredComponents(employees, searchKeyword)
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
