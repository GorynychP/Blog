import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
	background: green;
`;

const III = styled.i`
	height: '50px';
	width: '50px';
`;
function App() {
	return (
		<Div className="App">
			<div> Наченм проект мечты </div>
			<i className="fa-solid fa-music"></i>
			<III
				className="fa-solid fa-tree"
				style={{ color: '#26df8e' }}
			></III>
			<i className="fa fa-binoculars" aria-hidden="true"></i>
		</Div>
	);
}

export default App;
