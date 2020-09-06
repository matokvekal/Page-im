import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../../context/ConfigContext';
import { pageimEndPoint } from '../../../Config';
import Checkboxes from './cards-extra';
import person from './../../../assets/person.png';
import quantity from './../../../assets/quantity.png';
import israelFlag from './../../../assets/israelFlag.png';
import trophy from './../../../assets/trophy.png';
import club_flag from './../../../assets/club_flag.png';
import medal2 from './../../../assets/medal2.png';
import medal3 from './../../../assets/medal3.png';
import Stars from './Stars';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import usePagination from './../../../hooks/Pagination';


export const Card3 = (props) => {
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [trigerFetch, setTrigerFetch] = useState([]);
  const [tableFields, setTableFields] = useContext(ConfigContext);
  const [AppFields, setAppFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('Err card3');
  const [popupCard, setPopupCard] = useState('');
  const [responsItems, setResponseItems] = useState(1500);
  const { items, setItems, currentPage, itemsPerPage } = usePagination();
  let app = props.app ? props.app : '';
  let APP = app ? app.substr(1) : '';
  APP = APP.toLowerCase();

  const newSearch = atom({
    key: "searchState",
    default: "",
  });
  const [searchNew, setSearchNew] = useRecoilState(newSearch);

  const newFilter = atom({
    key: "filterState",
    default: "",
  });
  const [filter, setFilter] = useRecoilState(newFilter);
  
  useEffect(() => {
    if (!tableFields || tableFields.length === 0) {
      if (localStorage['fields']) {
        let data = JSON.parse(localStorage['fields']);
        setTableFields(data);
      };
    }
    if (APP) {
      setAppFields(tableFields.filter(x => x.application === APP));
      //new test if now fields of current App it may new app, so go to server to bring all
    }
    if(!tableFields ||tableFields.length===0)
    localStorage.removeItem("fields");
  }, [tableFields])



  useEffect(() => {
    // debugger
    if (app === '/' || app === '/Templates')
      return
    if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
      console.log('no freeUserToken card3')
    }
    else {
      const URL = `${API_ENDPOINT}/devicedata/stateUpdate?app=${APP}&search=${searchNew}&currentpage=${currentPage}&itemsperpage=${itemsPerPage}`;
      fetch(URL, {
        method: 'POST',
        headers: { Authorization: "Bearer " + localStorage['freeUserToken'] },
      }

      )
        .then(response => {
          //debugger
          return response.json()
        })
        .then(res => {
          //debugger
          setData(res.res ? res.res : null); setItems(res.total[0].totalRows)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  }, [AppFields, searchNew, currentPage, itemsPerPage]);

  useEffect(() => {
    //debugger
    if (app === '/' || app === '/Templates'||filter.value=='undefined' || filter.name=='undefined' ||!filter.value || !filter.name)
      return
    if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
      console.log('no freeUserToken card3')
    }
    else {
      debugger
      let data=filter;
      const URL = `${API_ENDPOINT}/devicedata/filterUpdate?app=${APP}&checked=${filter.checked}&name=${filter.name}&value=${filter.value}&itemsperpage=${itemsPerPage}`;
      fetch(URL, {
        method: 'POST',
        headers: { Authorization: "Bearer " + localStorage['freeUserToken'] },
      }

      )
        .then(response => {
          //debugger
          return response.json()
        })
        .then(res => {
          //debugger
          setData(res.res ? res.res : null); setItems(res.total[0].totalRows)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  }, [filter]);




  return (
    <>
      {!AppFields || AppFields.length === 0 ||!data  
      ?
        <span className='error'>Error occured : {errorMsg}</span> :

        <div className="cards__area">
                  
          <div className="cards">
            {data.map((el, index) => (
              <>
                <div className={popupCard === index ? 'card__item active' : data.length < 5 ? 'card__item card_item_width' : 'card__item'} id={popupCard === index ? 'popup' : null}>

                  {/*<!-- Card Header-->*/}
                  <div className="card__header">
                    <div className="profile__img">
                      <img src={person} alt="" />
                    </div>
                    <div className="name__trophy">
                      <div className="name__place">
                        <p>({el['total_finish_race']})</p>
                        <p className="user__place" >{el['pos']}</p>
                        <p className="user__name">{el['full_name']}</p>
                      </div>
                      <div className="race__name__year">
                        <p className="race__name">{el['race_name']}</p>
                        <p className="race__year">{el['year']}</p>
                      </div>
                      <div className="trophy__quantity">
                        {el['pos'] === '1'
                          ?
                          <img className="trophy" src={trophy} alt="" />
                          :
                          el['pos'] === '2'
                            ?
                            <img className="quantity" src={medal2} alt="" />
                            :
                            el['pos'] === '3'
                              ?
                              <img className="quantity" src={medal3} alt="" />
                              : null
                        }
                        <p className="race__branch">{el['branch']}</p>
                      </div>
                    </div>
                    <div className="flag__status">
                      <i className="fa fa-circle" aria-hidden="true"></i>
                      <img className="flag__img" src={israelFlag} alt="" />
                    </div>
                  </div>
                  {/*<!-- Card Content -->*/}
                  <div className="card__content">

                    <div className="left">
                      {AppFields.filter(x => (x.card_show_list === 1)).slice(0, popupCard !== index ? 7 : 100).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index1) => (
                        <>
                          {
                            header.card_show_list === 1 && el[header.name]
                              ?
                              <p>{header.label}:</p>
                              :
                              <p></p>
                          }
                        </>
                      ))}
                    </div>
                    <div className="right">
                      {AppFields.filter(x => (x.card_show_list === 1)).slice(0, popupCard !== index ? 7 : 100).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index2) => (
                        <>
                          {
                            header.card_show_list === 1 && el[header.name]
                              ?
                              <p>{el[header.name]}</p>
                              :
                              <p></p>
                          }
                        </>
                      ))}
                    </div>



                  </div>
                  <div className="card__footer">
                    <div className="icons">
                      <i className="fas fa-share-alt-square share"></i>
                      <input className="check" type="checkbox" name="completed" id="" />

                    </div>
                    <div className="card__footer__main">

                      {popupCard === index
                        ?
                        <a className="close__button" href="#" onClick={() => { setPopupCard() }}><i className="fas fa-times close-btn"></i> Close</a>
                        :
                        <a className="more__button" href="#" onClick={() => { setPopupCard(index) }}>More</a>
                      }
                      <div className="like__sec">
                        <i className="fas fa-heart"></i>
                        <p>112+</p>

                      </div>
                      <Stars rating={(el['total_finish_cat'] - el['pic']+1) * 100 / el['total_finish_cat']} />


                    </div>
                  </div>


                </div>
              </>
            ))}




          </div>
        </div>
      }
    </>
  )
}
export default Card3;
