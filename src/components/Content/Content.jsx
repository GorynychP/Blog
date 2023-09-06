import React from 'react';
import { styled } from 'styled-components';
const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
export const Content = ({ children, error }) =>
	error ? (
		<Div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</Div>
	) : (
		children
	);
