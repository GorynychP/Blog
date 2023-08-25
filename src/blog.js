import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
	text-align: center;
	padding: 120px 0;
	background: green;
`;
const H2 = styled.h2`
	text-align: center;
`;
const Header = () => {
	return <h2>Здаров, я бошка</h2>;
};
const Footer = () => {
	return <h2>Здаров, я жопа</h2>;
};

export const Blog = () => {
	return (
		<>
			<Header />
			<Content className="App">
				<H2>Контент страници</H2>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/regiser" element={<div>Резистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post:postId" element={<div>Статья </div>} />
					<Route path="*" element={<div>Шо-то неизвсестное</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	);
};
