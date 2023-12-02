import React from 'react';
import PieChart from './PieChart';

const Chart = ({data}) => {
 // console.log("inside chart",data);

  return (
    <div className=' absolute right-1/3 mt-8'>
      <h1>Posts by User 1</h1>
      <PieChart data={data} />
    </div>
  );
};

export default Chart;
