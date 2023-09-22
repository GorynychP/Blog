import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components/post-card/post-card';
import { PAGINATION_LIMIT } from '../../components/constants';
import { Pagination } from './components/pagination/pagination';
import { debounce, getLastPageFromLink } from './utils';
import { Search } from './components';

const MainContainer = ({ className }) => {
	const requestServer = useServerRequest();
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [limitPage, setLimitPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [searchPhrase, setSearchPhrase] = React.useState('');
	const [shouldSearch, setShouldSearch] = React.useState(false);
	useEffect(() => {
		requestServer(
			'fetchPosts',
			searchPhrase.trim(),
			page,
			PAGINATION_LIMIT,
		).then(({ res: { posts, links } }) => {
			setPosts(posts);
			setIsLoading(false);
			setLimitPage(getLastPageFromLink(links));
		});
		window.scroll(0, 0);
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 1500),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch, setPage);
		setTimeout(() => setPage(1), 1500);
	};
	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			<div className="post-list">
				{posts.length ? (
					posts.map(
						({
							id,
							image_url,
							title,
							published_at,
							commentsCount,
						}) => (
							<PostCard
								key={id}
								id={id}
								imageUrl={image_url}
								title={title}
								publishedAt={published_at}
								commentsCount={commentsCount}
							/>
						),
					)
				) : isLoading ? null : (
					<div className="not-found-post">
						<h2>Такого поста нет</h2>{' '}
					</div>
				)}
			</div>

			{limitPage > 0 && (
				<div className="pagination">
					<Pagination
						page={page}
						setPage={setPage}
						limitPage={limitPage}
					/>
				</div>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	min-height: 600px;
	padding-bottom: 60px;
	position: relative;
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	& .not-found-post {
		margin: 0 auto 350px;
	}
	& .pagination {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
`;
