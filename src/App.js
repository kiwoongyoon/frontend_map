import React,{useEffect,useState} from 'react'; 
import axios from 'axios' ;
// const GETSERVER_URL = 'http://localhost:8080/api/result';
function App(){
  const [check, setCheck] = useState(0);
  const [state, setState] = useState({
    center: {
      lat: 37.5525,
      lng: 126.927,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
      console.log(state.center);
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, [check]);

  const [placelist, setPlacelist] = useState(null) ; 
   useEffect(()=>{
    //처음에 fetch 해주기 
     newFetchData();
   },[]); 
   const newFetchData = ()=>{
    //백엔드에서 크롤링 한 결과들을 갖고 오는 부분
    return axios.get('http://localhost:8080/api/getplace').then((response)=>{
      console.log(response.data) ;
      setPlacelist(response.data) ; 
    })
  }
  const SubmitHandler=async(e)=>{
    e.preventDefault() ;
    alert("제출됨");
    const placeget = e.target.placeget.value ; 
    await axios.post("http://localhost:8080/api/getplace" , {placeget})
    .then((response)=>{
      console.log(response.data) ; 
      setPlacelist(response.data) ; 
    })


    newFetchData() ; 
  }


  return (
    <>
      <h1>당신의 지역을 입력하세요</h1>
      <form onSubmit={SubmitHandler}>
        <input name='placeget'/>
        <button type='submit' >추가</button>
      </form>
      {/* 리스트에 아무것도 없으면 출력이 안 되도록 해주기  */}
      {placelist?.map((place)=>(
        <div key= {place.id}>
          <div>{place.title}</div>
          <div>{place.phone}</div>
        </div>
      ))}
      
    </>
  )
}
export default App; 