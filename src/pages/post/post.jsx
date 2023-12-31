import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comments, PostContent, PostForm } from './components';
import styled from 'styled-components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { RESET_POST_DATA, loadPostAsync } from '../../store/actions';
import { selectPost } from '../../selectors';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../components/constants';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');
	const requestServer = useServerRequest();
	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, requestServer, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
	white-space: pre-line;
`;
