import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { styled } from 'styled-components';
import { Button, Input } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setUser } from '../../store/actions';
import { selectorUserRole } from '../../selectors';
import { ROLE } from '../../bff/constants';
const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполнить логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполнить пароль')
		.matches(
			/^[\w#%/]+/,
			'Неверный пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверный заполнен пароль. Минимум 6 символа')
		.max(20, 'Неверный заполнен пароль. Максимум 20 символов'),
});
const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;
const ErrorMessage = styled.div`
	margin: 10px 0 0;
	padding: 10px;
	font-size: 18px;
	background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectorUserRole);
	const store = useStore();
	const dispatch = useDispatch();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	useEffect(() => {
		let currentWasLogouyt = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogouyt;
			currentWasLogouyt = store.getState().app.wasLogout;
			if (currentWasLogouyt !== previousWasLogout) {
				reset();
			}
		});
	}, [store, reset]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}
	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type={'text'}
					placeholder={'Логин...'}
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/regiser">
					<div>Регистрация</div>
				</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
