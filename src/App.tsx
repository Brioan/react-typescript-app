import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import * as React from 'react';
import './App.css';

// const url = 'https://api.auckland.ac.nz/service/courses/v2/courses?catalogNbr=101&subject=COMPSCI';
// const url = 'https://api.auckland.ac.nz/service/courses/v2/courses?subject=';


interface IState {
	courses: any,
	subject: any,
	catalogNbr: any,
}

export default class App extends React.Component<{}, IState> {

	constructor(props: any) {
		super(props)
		this.state = {
			courses: '',
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
			courses: '',
			subject: this.state.subject,
			catalogNbr: this.state.catalogNbr,
		});

		// const urlSend = url + this.state.subject + '&catalogNbr=' + this.state.catalogNbr;
		const url = 'https://api.auckland.ac.nz/service/courses/v2/courses?subject='+this.state.subject+'&catalogNbr='+this.state.catalogNbr;

		global.console.log(this.state.courses);


		fetch(url, {
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
					// response.json().then((data: any) => this.setState({ courses: data.data[0] }))
					response.json().then((data: any) => this.setState({ courses: data.data[0] }))

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

		const listItem = this.state.courses;

		return (
			<div className="container-fluid">
				<div className="centreText">
					<h2>Get UoA Course Information</h2>

					<div className="inputs">
						<Paper>
							<div className="submit">
								<h3>Enter Course:</h3>
								<form onSubmit={this.handleClick}>
									<TextField
										style={{ margin:10 }}
										className="text-field"
										placeholder="COMPSCI"
										label="Subject"
										name="subject"
										type="text"
										
										// value={this.state.subject}
										onChange={this.handleChangeSubject}
									/>
									<TextField
										style={{ margin:10 }}
										className="text-field"
										placeholder="101"
										label="Number"
										name="catalogNbr"
										type="text"
										
										// value={this.state.catalogNbr}
										onChange={this.handleChangeCatalogNbr}
									/>
									<Button
										style={{ margin:10 }}
										variant="contained" 
										className="text-submit"
										type="submit"
										// onClick={this.handleClick}
									>
										Submit
									</Button>

								</form>
							</div>
						</Paper>
					</div>

					<div className="page">
						{
							Object.keys(this.state.courses).length === 0 ?
							<Grid/>:
							<Grid>
								<Paper>
									<List>
										<ListItem>
											<ListItemText primary={listItem.subject} />
										</ListItem>
										<ListItem>
											<ListItemText primary={listItem.catalogNbr}/>
										</ListItem>
										<ListItem>
											<ListItemText primary={listItem.titleLong}/>
										</ListItem>
										<ListItem>
											<ListItemText primary={listItem.description}/>
										</ListItem>
										<ListItem>
											<ListItemText primary={listItem.rqrmntDescr}/>
										</ListItem>
									</List>
									
								</Paper>
							</Grid>
						}

						
					</div>
				</div>
			</div>
		);
	}
}

// docker run -it -p 3000:3000 -v /Users/brian/Developer/React/my-app/src:/my-app/src 49c9de928f3f