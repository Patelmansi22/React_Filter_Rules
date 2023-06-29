import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Select from 'react-select';
import { GoChecklist } from 'react-icons/go';
import { Link } from 'react-router-dom';
// import { FaTrash, FaEdit, FaHistory } from 'react-icons/fa'


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


const Rule = () => {
  const columns = [
    {
      name: 'Rule Name',
      selector: row => row.ruleName
    },
    {
      name: 'Parameter Name',
      selector: row => row.parameters.map((itm) => <div>
        {itm.label}
      </div>),
    },
    {
      name: "Parameter Value",
      selector: row => row.parameters.map((itm) => <div>
        {itm.value}
      </div>)

    },
    // {
    //   name: "edit",
    //   selector: row => 
    //   <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>editItem()}><FaEdit/></button>


    // }
  ];

  const [open, setOpen] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [parameter, setParameter] = useState("");
  const [globleParameter, setGlobleParameter] = useState(getParameterDetails());
  const [globleParameterSet, setGlobleParameterSet] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedCase, setCheckedCase] = useState(false);
  const [parameterValue, setParameterValue] = useState([]);
  const [ruleData, setRuleData] = useState(getRuleDetails());
  const [count, setCount] = useState(0)
  const [openParameterField, setOpenParameterField] = useState(false);
  const [parameterCount, setParameterCount] = useState([]);

  const [resultParameter, setResultParameter] = useState([]);

  const [click, setClick] = useState([])

  const [select, setSelect] = useState([]);

  let data1 = globleParameter.map((itm) => {
    return { value: itm, label: itm }
  });
  let data2 = ruleData.map((itm, idx) => {
    // <option value="1">One</option>

    return itm?.parameters.map((itm, i) => {
      return { label: itm.label, value: itm.value }
    })
  });

  const options = [].concat(data1)
  // console.log("options",options)
  // console.log("data2",data2[0])

  const editItem = () => {
    setOpen(true)


  };

  const openModalHandler = () => {
    setOpen(true)
  }
  const saveRuleHandler = () => {
    setRuleData([{ ruleName: ruleName, parameters: select, count: count, is_Checked: checked,checkedCase:checkedCase }, ...ruleData]);
    setRuleName("");
    setParameter("");
    setParameterValue("");
    setGlobleParameterSet(true)
    setOpen(false)
    window.location.reload();
  }
  // console.log("data", ruleData)

  useEffect(() => {
    localStorage.setItem("rules", JSON.stringify(ruleData))
  }, [ruleData])


  useEffect(() => {
    if (globleParameterSet)
      localStorage.setItem("rulesParameter", JSON.stringify(globleParameter))
  }, [globleParameterSet])

  const openParameterFieldHandler = () => {
    setOpenParameterField(true);
    setParameterCount([parameter, ...parameterCount])
  }

  const clickHandler = () => {
    setClick([...click, parameter]);
    setGlobleParameter([...globleParameter, parameter])
    setParameter("");
  }

  const selectHandler = (dropData = []) => {
    console.log("dropData", dropData);
    let oldRecord = dropData.map((itm, idx) => {
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

    setSelect([...oldRecord])
  }
  const handleChange = () => {
    setChecked(!checked);
  };

const handleCase =()=>{
  setCheckedCase(!checkedCase);
}
  console.log("select 2 >>", select);

  const chnageValueHAndler = (e, itm, idx) => {
    // console.log("e",select);
    console.log("itm >>>", itm);
    select[idx].value = e.target.value;
    setSelect([...select]);
  }
  console.log("parameter", parameter)
  return (
    <div className="m-4">
      <Link to="checkrule"><i className='check'><GoChecklist /></i></Link>


      <div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={openModalHandler}> Addrule + </button>
      </div>
      {
        <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content p-2">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">AddRule +</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <label className="">Rule Name</label>
              <input className="my-2 border border-secondary-subtle rounded p-1" type="text" value={ruleName} onChange={(e) => setRuleName(e.target.value)} />

              <div className="modal-body d-flex row">
                <div>
                  <button type="button" className="btn btn-primary btn-sm" style={{ marginLeft: "20rem" }} onClick={openParameterFieldHandler}>Add Parameter</button>
                </div>

                {openParameterField &&
                  <>
                    <div className="">
                      <input className="my-2 border border-secondary-subtle rounded p-1" type="text" value={parameter} onChange={(e) => setParameter(e.target.value)} placeholder="Enter Parameter Name" />
                      <button type="button " className="btn btn-primary mx-3" onClick={clickHandler}>Add</button>
                    </div>
                    <Select
                      options={options}
                      onChange={selectHandler}
                      isMulti={true}
                    />
                    {
                      select?.map((itm, idx) => {
                        return <>
                          <span>parameter ({itm.label})</span>

                          <textarea className="border border-secondary-subtle rounded p-1 my-1" rows="3" cols="12" placeholder="Enter Parameter Value" value={itm?.value}
                            onChange={(e) => chnageValueHAndler(e, itm, idx)
                            } />

                        </>
                      })
                    }
                    <div class="mb-3">
                      <input type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                      />
                      <label for="recipient-name" class="col-form-label">Check All</label>
                    </div>
                    <div class="mb-3">
                      <input type="checkbox"
                        checked={checkedCase}
                        onChange={handleCase}
                      />
                      <label for="recipient-name" class="col-form-label">Check All Case</label>
                    </div>

                    {/* {
                 parameterCount.map((itm,idx) => {
                   console.log("itm",itm);
                    return <>
                     <label className=""> Parameter {idx+1} </label>
                     <Select 
                     options= {options}
                     onChange={setSelect}
                     isMulti={true}

                     />
                      <input className="my-2 border border-secondary-subtle rounded p-1" type="text" value={parameter} onChange={(e)=>  setParameter(e.target.value)} placeholder="Enter Parameter Name"/>
                      <textarea className="border border-secondary-subtle rounded p-1 my-1" rows="3" cols="12" placeholder="Enter Parameter Value" value={parameterValue} onChange={(e) => setParameterValue(e.target.value)} />
                    </>
                 })
               } */}



                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveRuleHandler}>Save </button>
                    </div>

                  </>
                }
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

export default Rule