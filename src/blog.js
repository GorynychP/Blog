import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Header } from './components';
import { Authorization } from './pages';

const Content = styled.div`
	text-align: center;
	padding: 120px 0;
`;
const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content className="App">
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/regiser" element={<div>Резистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post:postId" element={<div>Статья </div>} />
					<Route path="*" element={<div>Шо-то неизвсестное</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
