import Button from '@material-ui/core/Button';
import * as React from 'react';
import './App.css';

// const url = 'https://api.auckland.ac.nz/service/courses/v2/courses?catalogNbr=101&subject=COMPSCI';
const url = 'https://api.auckland.ac.nz/service/courses/v2/courses?subject=';


interface IState {
	courses: any[],
	subject: any,
	catalogNbr: any,
}

export default class App extends React.Component<{}, IState> {

	constructor(props: any) {
		super(props)
		this.state = {
			courses: [],
			subject: '',
			catalogNbr: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChangeSubject = this.handleChangeSubject.bind(this);
		this.handleChangeCatalogNbr = this.handleChangeCatalogNbr.bind(this);
	}

	public handleClick(e: any) {
		if (e) { e.preventDefault(); }
		this.setState({
			subject: '',
			catalogNbr: '',
		});

		const urlSend = url + this.state.subject + '&catalogNbr=' + this.state.catalogNbr;
		alert(JSON.stringify(this.state.courses));

		fetch(urlSend, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				// 'Content-Type': 'application/json',
				
			},

		})
			.then((response: any) => {
				if (!response.ok) {
					this.setState({ subject: response.statusText, catalogNbr: response.statusText })
				}
				else {
					response.json().then((data: any) => this.setState({ courses: data.data[0]}))
				}
				return response
			})
	}

	public handleChangeSubject(e: any) {
		this.setState({
			subject: e.target.value,
		});
	}

	public handleChangeCatalogNbr(e: any) {
		this.setState({
			catalogNbr: e.target.value,
		});
	}



	public render() {
		// const subject = this.state.subject;
		// const catalogNbr = this.state.catalogNbr;

		return (
			<div className="container-fluid">
				<div className="centreText">
					<h2>Get UoA Course Information</h2>
					<div className="submit">
						<h3>Enter Course</h3>
						<form onSubmit={this.handleClick}>
							<input
								className="text-field"
								placeholder="COMPSCI"
								name="subject"
								type="text"
								// value={this.state.subject}
								onChange={this.handleChangeSubject}
							/>
							<input
								className="text-field"
								placeholder="101"
								name="catalogNbr"
								type="text"
								// value={this.state.catalogNbr}
								onChange={this.handleChangeCatalogNbr}
							/>
							<Button
								variant="contained" color="primary"
								className="text-submit"
								type="submit"
								// onClick={this.handleClick}
							>
								Submit
							</Button>

						</form>


					</div>
					<div className="page">
						{/* <p>{this.state.subject}</p>
						<p>{this.state.catalogNbr}</p> */

						// <p>{this.state.courses}</p>
						}

						
					</div>
				</div>
			</div>
		);
	}
}

// docker run -it -p 3000:3000 -v /Users/brian/Developer/React/my-app/src:/my-app/src 49c9de928f3f