import { styled } from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<footer className={className}>
			<h2>Здаров, я бошка</h2>
		</footer>
	);
};
export const Footer = styled(FooterContainer)`
	background-color: blue;
`;
