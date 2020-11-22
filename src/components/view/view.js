import React from 'react';
import './view.css';
import Loader from "../loader/loader";

function DataTable(props) {
    const dataArray = props.data;
    let items = [];
    let id = 1;
    let key = 0;

    for (let i = 0; i < dataArray.length; i++) {
        let entry = dataArray[i];
        let even = i % 2 === 0;

        items.push(
            <tr key={key++} className={even ? "even" : "odd"}>
                <td colSpan={2}>{entry.UploadDate.substring(0, 10)}</td>
                <td colSpan={2}>{entry.File}</td>
            </tr>
        );
         let row = entry.Fields;

        for (let field of row) {
            items.push(
                <tr key={key} className={even ? "even" : "odd"}>
                    <td>{id++}</td>
                    <td>{field.FieldNumber}</td>
                    <td><input disabled={true}
                               type="checkbox"
                               checked={field.IsProtected} /></td>
                    <td>{field.Category !== null ? field.Category : ""}</td>
                </tr>
            );
            key++;
        }
    }

    return (
        <table id="view">
            <thead>
            <tr>
                <th>ID</th>
                <th>Field Number</th>
                <th>Is Protected</th>
                <th>Category</th>
            </tr>
            </thead>
            <tbody>
            {items}
            </tbody>
        </table>
    )
}

class View extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state = {
            loading: false,
            dataArray: props.data,
        }
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.pageHandler(1, {access_token: null}, null);
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
                    <h1>View</h1>
                    <form onSubmit={this.onFormSubmit} id="revise">
                        <div className="table-container">
                            <DataTable data={this.state.dataArray} />
                        </div>
                        <div className="submitDiv">
                            <input className="submitBtn" type="submit" value="Done" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default View;