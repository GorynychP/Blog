import PropTypes from 'prop-types';
import { ROLE } from './role';

export const PROP_TYPE = {
	ROLE_ID: PropTypes.oneOf(Object.values(ROLE)),
	ROLE: PropTypes.shape({
		id: PropTypes.oneOf(Object.values(ROLE)),
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	COMMENT: PropTypes.shape({
		id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		published_at: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		image_url: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		published_at: PropTypes.string.isRequired,
	}),
};
