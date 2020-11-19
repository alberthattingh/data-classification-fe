import React from 'react';
import './revise.css';
import Loader from "../loader/loader";

function DataTable(props) {
    const dataArray = props.data;
    let items = [];

    for (let i = 0; i < dataArray.length; i++) {
        let row = dataArray[i];
        let even = i % 2 === 0;

        for (let field of row) {
            items.push(
                <tr key={field.number} className={even ? "even" : "odd"}>
                    <td>{field.number}</td>
                    <td>{field.value}</td>
                    <td><input onChange={(e) => props.checkHandler(e, field.number)}
                               type="checkbox"
                               checked={field.isClassified} /></td>
                    <td><input onChange={(e) => props.textHandler(e, field.number)}
                               value={field.classifiedAs !== null ? field.classifiedAs : ""}
                               type="text"/></td>
                </tr>
            );
        }
    }

    return (
        <table id="revise">
            <thead>
            <tr>
                <th>ID</th>
                <th>Field Value</th>
                <th>Is Protected</th>
                <th>Classified As</th>
            </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    )
}


class Revise extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.state = {
            loading: false,
            dataArray: props.data
        }
    }

    onFormSubmit(event) {
        event.preventDefault();

    }

    onTextChange(event, fieldNumber) {
        const data = this.state.dataArray;
        let done = false;

        for (let i = 0; i < data.length; i++) {
            // let row = data[i];

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j].number === fieldNumber) {
                    data[i][j].classifiedAs = event.target.value === "" ? null : event.target.value;
                    done = true;
                    break;
                }
            }
            if (done)
                break;
        }

        this.setState({dataArray: data}, () => {
            console.log(this.state.dataArray);
        });
    }

    onCheckboxChange(event, fieldNumber) {
        const data = this.state.dataArray;
        let done = false;

        for (let i = 0; i < data.length; i++) {
            // let row = data[i];

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j].number === fieldNumber) {
                    data[i][j].isClassified = !data[i][j].isClassified;
                    done = true;
                    break;
                }
            }
            if (done)
                break;
        }

        // this.props.pageHandler(3, {access_token: this.props.token}, data);

        this.setState({dataArray: data});
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader />
            );
        }
        else {
            return (
                <div id="outer">
                    <h1>Revise</h1>
                    <form onSubmit={this.onFormSubmit} id="revise">
                        <div className="table-container">
                            <DataTable
                                textHandler={this.onTextChange}
                                checkHandler={this.onCheckboxChange}
                                data={this.state.dataArray} />
                        </div>
                        <div className="submitDiv">
                            <input className="submitBtn" type="submit" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Revise;