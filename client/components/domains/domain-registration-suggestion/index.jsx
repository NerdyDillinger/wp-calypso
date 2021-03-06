/**
 * External dependencies
 */
var React = require( 'react' ),
	isEmpty = require( 'lodash/lang/isEmpty' );

/**
 * Internal dependencies
 */
var DomainSuggestion = require( 'components/domains/domain-suggestion' ),
	cartItems = require( 'lib/cart-values/cart-items' );

var DomainRegistrationSuggestion = React.createClass( {
	propTypes: {
		cart: React.PropTypes.object,
		suggestion: React.PropTypes.object,
		onButtonClick: React.PropTypes.func
	},

	buttonLabel: function( isAdded ) {
		if ( this.props.buttonLabel ) {
			return this.props.buttonLabel;
		}

		if ( isAdded ) {
			return null;
		}

		return this.translate( 'Add', {
			context: 'Add a domain registration to the shopping cart'
		} );
	},

	render: function() {
		var suggestion = this.props.suggestion ? this.props.suggestion : {},
			domainName = suggestion.domain_name ? suggestion.domain_name : this.translate( 'Loading\u2026' ),
			isAdded = !! ( this.props.cart && cartItems.hasDomainInCart( this.props.cart, suggestion.domain_name ) ),
			buttonClasses;

		if ( isAdded ) {
			buttonClasses = 'added';
		} else {
			buttonClasses = 'add is-primary';
		}

		return (
			<DomainSuggestion
					price={ suggestion.product_slug ? suggestion.cost : undefined }
					isLoading={ isEmpty( suggestion.cost ) }
					domain={ suggestion.domain_name }
					buttonClasses={ buttonClasses }
					buttonLabel={ this.buttonLabel( isAdded ) }
					isAdded={ isAdded }
					cart={ this.props.cart }
					onButtonClick={ this.props.onButtonClick }>
				<h3>{ domainName }</h3>
			</DomainSuggestion>
		);
	}
} );

module.exports = DomainRegistrationSuggestion;
