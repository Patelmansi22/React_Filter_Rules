// import { buildTimeValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'


const Addrule = () => {
    const storage = JSON.parse(localStorage.getItem('Filter'))
    // console.log(storage)
    const [data, setData] = useState(storage?.length > 0 ? storage : []);
    const [ruleName, setRuleName] = useState("1");
    const [primaryName, setPrimaryName] = useState("");
    const [primaryValue, setPrimaryValue] = useState("");
    const [array,setArray]=useState([])
    const handleAdd =()=>{
 

        let userInput1 = prompt("Enter the first value:");
        array.push(userInput1);
        
        let userInput2 = prompt("Enter the second value:");
        array.push(userInput2);
        
        console.log(array); // Output: ["value1", "value2"]
        
    }
    const handlesubmit = () => {
        const value = {  primaryName: primaryName, primaryValue: primaryValue, count: 0 }
        const item = data?.length > 0 ? [...data] : []
        item.push(value)
        console.log(item)
        localStorage.setItem("Filter", JSON.stringify(item));
        setData(item)

        setPrimaryName("")
        setPrimaryValue("");
        // setRuleName("");
    }
    useEffect(() => {
        setData(storage)
    }, [storage ])

    return (
        <div>
            <button type="button" class="btn btn-primary m-4" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Addrule +</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Addrule</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" >
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Rule Name</label>
                                    <input type="text" class="form-control"  onChange={(e) => setRuleName(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Primary Name</label>
                                    <input type="text" class="form-control"  onChange={(e) => setPrimaryName(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Primary Value</label>
                                    <input type="text" class="form-control"  onChange={(e) => setPrimaryValue(e.target.value)} />
                                </div>
                                <button type="button" class="btn btn-primary m-4"  on onClick={handleAdd}>Addrule +</button>
                                
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={handlesubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">RuleName</th>
                        <th scope="col">Parameter Name</th>
                        <th scope="col">Parameter Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) =>
                        <>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.ruleName}</td>
                                <td>{item.primaryName}</td>
                                <td>{item.primaryValue}</td>
                            </tr>
                        </>

                    )}  </tbody>
            </table>

        </div>
    )
}

export default Addrule;


