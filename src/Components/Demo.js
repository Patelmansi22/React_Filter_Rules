import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Select from 'react-select';

import { AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const getRuleDetails = () => {
  let d = localStorage.getItem("rules");
  if (d) {
    return d = JSON.parse(localStorage.getItem("rules")) || [];
  }
  else {
    return []
  }
}
const getParameterDetails = () => {
  let d = localStorage.getItem("rulesParameter");
  if (d) {
    return d = JSON.parse(localStorage.getItem("rulesParameter")) || [];
  }
  else {
    return []
  }
}

const Demo = () => {

  const [open, setOpen] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [ruleData, setRuleData] = useState(getRuleDetails());
  // const [ruleValue, setRuleValue] = useState("");
  const [parameter, setParameter] = useState("");
  const [parameterValue, setParameterValue] = useState([]);
  let d = ruleData?.filter((itm) => itm.value == parameterValue);
  // console.log("d",d[0]?.count);
  const [count, setCount] = useState(0);
  const [match, setMatch] = useState(false);
  const globleParameter = getParameterDetails()

  const [select, setSelect] = useState([]);

  const [resultParametreVal, setResultParametrVal] = useState([])

  let data1 = globleParameter.map((itm) => {
    return { value: itm, label: itm }
  });
  console.log(globleParameter, '&&')
  const options = [].concat(data1)


  // console.log("options",options)
  const columns = [
    {
      name: 'Rule Name',
      selector: row => row.ruleName
    },
    {
      name: 'parameter',
      selector: row => row.parameters.map((itm) => <div>
        {itm.label}
      </div>),
    },
    {
      name: "parameter value",
      selector: row => row.parameters.map((itm) => <div>
        {itm.value}
      </div>)

    },
    {
      name: "Count",
      selector: row => row.count,
    }
  ];
  const openModalHandler = () => {
    setOpen(true)
  }

  const checkRuleHandler = async () => {

    console.log("select", select)
    ruleData?.find((itm, i) => {
      itm.parameters.filter((itm1) => {
        if (!itm?.is_Checked && !itm1?.value?.includes('|')) {
          console.log("itm1 >>>", itm1);



          let data = select?.filter((itm2) => {
            console.log("itm2 >>>", itm2);
            if(itm?.checkedCase){

              if (itm2.value.toLowerCase()?.includes(itm1.value.toLowerCase())) {
                alert("True>>")
  
              }
            }else{

              if (itm2.value.includes(itm1.value)) {
                alert("True")
  
              }
            }
          });

          console.log("data", data);


          //   if(itm1.label == data[0]?.label){
          //     return data
          //   }

          // console.log("resultParameter >>>", resultParameter);
        }
        if (itm?.is_Checked && itm1.value.includes('|')) {

          const split = itm1.value.split('|');
          console.log(split)


          let count = 0
          if(itm?.checkedCase){
          split.map((val) => {
            select?.filter((itm2) => {
              console.log("itm3 >>>", itm2);
              console.log(itm2.value.toLowerCase()?.includes(val.toLowerCase()))
              if (itm2.value.toLowerCase()?.includes(val.toLowerCase())) {
                count = count + 1
              }
            })
          });
          if (count === split.length) {
            alert("With Checked True>>")
          }
          console.log("data", count);

        }else{
          split.map((val) => {
            select?.filter((itm2) => {
              console.log("itm3 >>>", itm2);
              console.log(itm2.value?.includes(val))
              if (itm2.value?.includes(val)) {
                count = count + 1
              }
            })
          });
          if (count === split.length) {
            alert("With Checked True")
          }
          console.log("data", count);

        }
          //   if(itm1.label == data[0]?.label){
          //     return data
          //   }

          // console.log("resultParameter >>>", resultParameter);

        }
      });

      // if(resultParameter.label == parameter && resultParameter.value?.split("|").some((itm)=> parameterValue.includes(itm))){  
      //   // setCount(count+1)
      //   setMatch(true);
      //   return (setCount(itm.count+1),itm.count = itm.count+1)
      // }else{
      //   setMatch(false);
      // }
    })

    setRuleName("");
    setParameter("");
    setParameterValue("");
    setOpen(false);

  }



  useEffect(() => {
    localStorage.setItem("rules", JSON.stringify(ruleData))
  }, [count, !open]);

  const selectHandler = (val) => {
    console.log("val", val);
    let oldRecord = val.map((itm, index) => {
      console.log("onSelect >>> ", select);
      console.log("itm >>> ", itm);

      let isexist = select.length == 0 ? -1 : select.indexOf((itm2) => itm.label == itm2.label);
      if (isexist == -1) {
        let val = select?.filter((itm1) => {
          if (itm1.label == itm.label) {
            return itm.value = itm1.value
          }
        })
        return {
          label: itm.label,
          value: val[0]?.value
        }
      }

    });

    console.log("oldRecord >> ", oldRecord[0])
    // setSelect(val)
    setSelect([...oldRecord])

  }

  const changeHandler = (e, itm, index) => {
    setParameterValue(e.target.value)
    // let a = select.filter((itm1)=> {
    //   if(itm1.label == itm.label){
    //     return setResultParametrVal([{
    //       label : itm.label,
    //       value: itm.value,
    //       parvalue : e.target.value
    //     }])
    //   };

    // })
    select[index].value = e.target.value;
    setSelect([...select]);

  }
  // console.log("ruleData 1 >>",ruleData);
  console.log("select 1 >>", select);
  let rule = ruleData.map((v) => v.parameters.map((v) => v.label))
  console.log("ruleData >>>", rule.map((v) => v[0]?.includes(select)));
  // console.log("resultParameterVal >>",resultParametreVal);
  return (
    <div className="m-4">
      <Link to="/"><i className='Add'><AiFillFileAdd /></i></Link>
      <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={openModalHandler}>  Check Rule </button>
      </div>
      {
        <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content p-2">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Check Rule</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex row">
                {/* {/ <input className="my-2 border border-secondary-subtle rounded p-2" type="text"  value={ruleName}  onChange={(e) => setRuleName(e.target.value)} placeholder="Enter Rule Name"/> <hr className="my-2"/> /} */}


                {/* {/ <input className="my-2 border border-secondary-subtle rounded p-2" type="text" value={parameter} onChange={(e)=> setParameter(e.target.value)} placeholder="Enter Parameter name" /> /} */}

                {/* <select className="form-select my-2" aria-label="Default select example" onChange={(e)=> setParameter(e.target.value)}>
                    <option selected>Select Parameter</option>
                    {
                        ruleData.map((itm,idx)=> {
                    // <option value="1">One</option>
                          return itm?.parameters.map((itm)=> {
                            return <option value={itm.label}>{itm.label}</option>
                          })
                        })
                      }
                  </select> */}

                <Select
                  options={options}
                  onChange={selectHandler}
                  isMulti={true}
                  placeholder="SELECT PARAMETER..."
                />
                {
                  select.map((itm, idx) => {
                    return <>
                      <label> parameter {(itm.label)}</label>
                      <textarea className="border border-secondary-subtle rounded p-2 my-3" rows="3" cols="12" placeholder="Enter Parameter Value" value={itm?.value} onChange={(e) => changeHandler(e, itm, idx)} />

                    </>
                  })
                }


                {/* <textarea className="border border-secondary-subtle rounded p-2 my-3" rows="3" cols="12" placeholder="Enter Parameter Value" value={parameterValue} onChange={(e) => setParameterValue(e.target.value)} />
                  {!open && <span style={{color: "red"}}>{match ? "Matched" : "Not a Match"}</span>} */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={checkRuleHandler}>Check </button>
              </div>
            </div>
          </div>
        </div>
      }
      <DataTable
        columns={columns}
        data={ruleData}
      />
    </div>
  )
}

export default Demo