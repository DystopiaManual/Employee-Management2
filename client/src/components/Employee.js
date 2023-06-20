import React, { useEffect } from 'react'
import moment from 'moment/moment';
import EmployeeDelete from './EmployeeDelete';

function Employee(props) {

  const moment = require('moment-timezone');
  const jd = props.joindate;  
  const dateInUS = moment(jd);

  // 미국시간을 한국시간으로 변경
  const dateInKR = dateInUS.tz('Asia/Seoul');
  const krTime = dateInKR.format();

  // 불필요 영역 자르기
  const dateResult = krTime.substr(0, 10);
  console.log(dateResult); 
  return (
    <tr className='employee-info'>
        <td>{props.id}</td>
        <td><img src={props.image} alt='프로필사진'/></td>
        <td>{props.NAME}</td>
        <td>{props.birthday}</td>
        <td>{props.gender}</td>
        <td>{props.job}</td>
        <td>{props.POSITION}</td>
        <td>{dateResult}</td>
        <td><EmployeeDelete name={props.NAME} id={props.id} stateRefresh={props.stateRefresh}/></td>
    </tr>
  )
}

export default Employee