import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EmployeeDashboard = () => {
	const {id} = useParams();
	const [transactions, setTransactions] = useState([])
	const [empData, setEmpData] = useState([]);
	const location = useLocation();
	const data = location.state?.empRes;

	console.warn("ashish",id)
	console.log('====================================');
	console.log(empData);
	console.log('====================================');
	useEffect(() => {
		axios
			.get("http://localhost:8000/allEmployeeData")
			.then((response) => {
				if (response.data) {
					setEmpData(response.data);
				} else {
					console.warn(response);
				}
			})
			.catch((err) => {
				console.error(err);
			});
  	}, []);

	const tableRef = useRef();
	const exportToPDF = () => {
		const input = tableRef.current;
		html2canvas(input).then((canvas) => {
			const pdf = new jsPDF("p", "pt", "a4");
			const imgData = canvas.toDataURL("image/png");
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
			pdf.save("table.pdf");
		});
  	};
  	return (
		<>
		<div className="employe_dashboard">
			<div className="container">
				<Row className="my-5  text-center">
					<Col>
						<h3>- User's Dashboard - </h3>
					</Col>
				</Row>

				<div ref={tableRef}>
					<div className="employee_data my-5">
						<div className="d-flex">
							<div className="pr-3">
								<h6>ID </h6>
								<h5>Name</h5>
								<h5>Email </h5>
								<h5>Mobile </h5>
								<h5>House No. </h5>
							</div>
							<div className="px-3">
								<h6>: {empData.length !== 0 ? empData[0]['user']['_id'] : ''}</h6>
								<h5>: {empData.length !== 0 ? empData[0]['user']['fname']+' '+empData[0]['user']['lname'] : ''}</h5>
								<h5>: {empData.length !== 0 ? empData[0]['user']['email'] : ''}</h5>
								<h5>: {empData.length !== 0 ? empData[0]['user']['mobile'] :''}</h5>
								<h5>: {}</h5>
							</div>
						</div>
					</div>

					<Table striped bordered hover>
						<thead>
							<tr>
								{/* <th>Id</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Mobile</th> */}
								<th>Date</th>
								<th>Credit Amount</th>
								<th>Debit Amount</th>
								<th>Interest Amount</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tbody>
							{empData !== []
							? empData.map(({ user: latestTransaction }, index) => {
								
								return (
									<>
									<tr key={transactions.id}>
										<td>{latestTransaction?.date}</td>
										<td>{latestTransaction?.credit || 0}</td>
										<td>{latestTransaction?.debit || 0}</td>
										<td>{latestTransaction?.interest || 0}</td>
										<td>{latestTransaction?.total || 0}</td>
									</tr>
									</>
								)
								})
							: ""}
							{/* {transactions.map((transaction) => ( */}
						</tbody>
					</Table>
				</div>
				<Button className="d-flex justify-content-end" onClick={exportToPDF}>Download PDF</Button>
			</div>
		</div>
		</>
	);
};

export default EmployeeDashboard;
