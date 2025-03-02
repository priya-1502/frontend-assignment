
import "./styles.css";
import { useState, useEffect, createContext, useContext } from "react";

function ListingData({ dataFetched ,nodata}) {
  
if(nodata){
	
	return (<tr class="nodataclass"><td></td><td 
>No data</td><td></td></tr>)
}
  const returnComp = dataFetched.map((data) => (
    <tr key={data["s.no"]}>
      <td>{data["s.no"]}</td>
      <td> {data["percentage.funded"]}</td>
      <td> {data["amt.pledged"]}</td>
    </tr>
  ));
  return returnComp;
}
function TableLoading({ datafetched ,nodata}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage funded</th>
            <th>Amount pledged</th>
          </tr>
        </thead>
        <tbody>
          <ListingData dataFetched={datafetched} nodata={nodata} />
        </tbody>
      </table>
    </>
  );
}

function Pagination({
	userData,
  setfetchedData,
  startIndex,
  endIndex,
  setendIndex,
  setStartIndex,
nodata
}) {
  function handleRightClick() {
    var ind = 0;
    var out = 0;
    if (endIndex + 5 <= userData.length) {
      ind = startIndex + 5;
      out = endIndex + 5;
      setStartIndex(() => startIndex + 5);
      setendIndex(() => endIndex + 5);
      const datatoset = userData.slice(ind, out);

      setfetchedData(datatoset);
    } else if (
      endIndex != userData.length &&
      endIndex + 5 > userData.length &&
      startIndex + 5 < userData.length
    ) {
      ind = startIndex + 5;
      out = userData.length - endIndex + startIndex + 5;
      setStartIndex(() => startIndex + 5);
      setendIndex(() => userData.length - endIndex + startIndex + 5);
      const datatoset = userData.slice(ind, out);

      setfetchedData(datatoset);
    }
  }
  function handleLeftClick() {
    var ind = 0;
    var out = 0;
    if (endIndex == userData.length) {
      out = userData.length - endIndex + startIndex;
      ind = startIndex - 5;
      setendIndex(() => out);
      setStartIndex(() => ind);
      const datatoset = userData.slice(ind, out);

      setfetchedData(datatoset);
    } else if (startIndex - 5 >= 0) {
      ind = startIndex - 5;
      out = endIndex - 5;
      setStartIndex(() => startIndex - 5);
      setendIndex(() => endIndex - 5);
      const datatoset = userData.slice(ind, out);

      setfetchedData(datatoset);
    }
  }
if(nodata) return <></>
  return (
    <>
      <div className="paginq">
        <span className="leftclick" onClick={() => handleLeftClick()}>
          {" "}
          &laquo;
        </span>
        <span>
          {startIndex+1} of {endIndex  }
        </span>

        <span className="rightclick" onClick={() => handleRightClick()}>
          {" "}
          &raquo;{" "}
        </span>
      </div>
    </>
  );
}


function App() {

const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setendIndex] = useState(5);
const [userData, setUserData] = useState([]);
const [nodata,setNodata]=useState(false);
const [datafetched, setfetchedData] = useState([]);
  const pageSize = 5;
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const data = await response.json();
	
        setUserData(data); 
	if(data && data.length && data.length<5){
			setendIndex(data.length)
		}
	if(!data || data.length==0){
		setNodata(true);
		
		
	}else{
	const datatorender = data.slice(startIndex, endIndex);
	setfetchedData(datatorender);
}
       	
      } catch (err) {
       
      }
    };

    fetchProjects();
  }, );
 
 	return (
  
	 <>
      <Pagination
        setfetchedData={setfetchedData}
        setendIndex={setendIndex}
        setStartIndex={setStartIndex}
        startIndex={startIndex}
        endIndex={endIndex}
	userData={userData}
	nodata={nodata}
      />
  	  <TableLoading datafetched={datafetched} nodata={nodata}  />
		
</>)
  
 
    
 


  
  
}

export default App;
