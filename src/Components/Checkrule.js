import { computeHeadingLevel } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'

const columns = [
    {
        name: 'Rule Name',
        selector: row => row.ruleName
    },
    {
        name: 'parameter Name',
        selector: row => row.parameters.map((itm) => <div>
            {itm.label}
        </div>),
    },
    {
        name: "Parameter Value",
        selector: row => row.parameters.map((itm) => <div>
            {itm.value}
        </div>)

    }
];
const getRuleDetails = () => {
    let d = localStorage.getItem("rules");
    if (d) {
        return d = JSON.parse(localStorage.getItem("rules")) || [];
    }
    else {
        return []
    }
}
const Checkrule = () => {

    const [ruleData, setRuleData] = useState(getRuleDetails());

    const [data, setData] = useState([]);
    const [primaryName, setPrimaryName] = useState("");
    const [checked, setChecked] = useState(false);

    const [primaryValue, setPrimaryValue] = useState("");
    const handleChange = () => {
        setChecked(!checked);
    };

    const contains = (target, pattern) => {
        console.log("pattern", pattern)
        let value2 = 0;
        pattern.forEach((word) => {
            value2 = value2 +
                target?.includes(word)
        })
        return (value2 === pattern.length)
    }

    console.log(primaryValue)
    const handlesubmit = () => {

    }
    // const handlesubmit = () => {
    //     console.log(ruleData)
    //     ruleData.map((it, index) => {
    //         let main;
    //         if (checked) {
    //             const val = it.primaryValue
    //             // console.log(val)
    //             // console.log(i)
    //             // const value = i.includes(val)
    //             const value = primaryValue.split(' ')
    //             main = (contains(val, value))
    //         } else {
    //             const value = primaryValue.split(' ')

    //             const val = it.primaryValue
    //             // main =primaryValue.equals(val)
    //             // console.log(`The word "${value}" ${val.includes(value) ? 'is' : 'is not'} in the sentence`);
    //         }

    //         // console.log("value",value)
    //         if (main !== false) {
    //             // console.log("i", typeof (i))
    //             // console.log(data[index].count)
    //             data[index].count = it.count + 1
    //             // console.log(data)
    //             localStorage.setItem("Filter", JSON.stringify(data));
    //             setData(data)
    //         }
    //     })




    // }
    // useEffect(()=>{
    //     setData(storage)
    // },[data])


    return (
        <div>
            <button type="button" class="btn btn-primary m-4" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Check</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Checkrule</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3 dropdown">
                                    <label for="recipient-name" class="col-form-label">Parameter Name</label>
                                    <div className="col-sm-10">

                                        <select class="form-select" onChange={(e) => setPrimaryName(e.target.value)}>
                                            {ruleData.map((k) => {

                                                return (
                                                    <option key={k} value={k}>{k.parameters?.label}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Parameter value</label>
                                    <textarea class="form-control" id="message-text" onChange={(e) => setPrimaryValue(e.target.value)}></textarea>
                                </div>
                                <div class="mb-3">
                                    <input type="checkbox"
                                        checked={checked}
                                        onChange={handleChange}
                                    />
                                    <label for="recipient-name" class="col-form-label">Check All</label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={() => handlesubmit()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={ruleData}
            />
        </div>
    )
}

export default Checkrule;
