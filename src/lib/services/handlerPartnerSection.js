import axios from "axios";
import { BASE_URL } from "../constants/constants";


function useGetRequest(url,callback=()=>{}) {

    axios.get(`${BASE_URL}/${url}`)
    .then(function (response) {
      callback(response.data) 
      return response.data
      // обработка успешного запроса
      //console.log(response.data.results);
    })
    .catch(function (error) {
      // обработка ошибки
      console.log(error);
    })
    .finally(function () {
      // выполняется всегда
    });
}


export default function handlerPartnerSection(callback=()=>{}) {
  // {
  //   title: "slide_5.title",
  //   img: "/images/partner_section/cisca.png",
  //   url: "https://scsa.org.ua/",

  // },


  
  const result = (data) => {
    console.log(data.results)
    if(!Array.isArray(data.results)){return}

    function getImj(url) {
      return axios.get(url);
    }
    
    // function getUserPermissions() {
    //   return axios.get('/user/12345/permissions');
    // }
    const promis =[]

    const newArr = data.results.map((el)=>{
      return {...el,imageUrl:useGetRequest(`files/${el.imageUrl}`)}
    })


    Promise.all([getUserAccount(), getUserPermissions()])
      .then(function (results) {
        const acct = results[0];
        const perm = results[1];
      });


    // const newArr = data.results.map((el)=>{
    //   return {...el,imageUrl:usGetRequest(`files/${el.imageUrl}`)}
    // })
    //callback(newArr)
  }

  useGetRequest('partners', result)
  // try {
  //   const response = await usGetRequest('partners')
  //   console.log(response);
  // } catch (error) {
  //   console.error(error);
  // }

  // Делаем запрос пользователя с данным ID
  // axios.get(`${BASE_URL}/partners`)
  //   .then(function (response) {
  //     // обработка успешного запроса
  //     console.log(response.data.results);
  //   })
  //   .catch(function (error) {
  //     // обработка ошибки
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     // выполняется всегда
  //   });

  // axios(`${BASE_URL}/payment`)
  // .then(function (response) {
	// 	if (response.data?.invoiceUrl) {
	// 		//window.location.href = response.data.invoiceUrl;
	// 		window.open(response.data.invoiceUrl);
	// 		callback('ok')
	// 	}else callback('error')
  // })
  // .catch(function (error) {
	// 	console.log(error)
	// 	callback('error')
  // });
}
