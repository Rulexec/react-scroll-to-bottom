import React from 'react';
import ReactDOM from 'react-dom';
import ScrollToBottom from 'react-scroll-to-bottom';

addStyle();

let div = document.createElement('div');
document.body.appendChild(div);

const LIMIT = 50;
let counter = 0;
let items = [];

for (let i = 0; i < LIMIT; i++) {
	addItem();
}

render();

setInterval(() => {
	addItem();
	render();
}, 500);

function addItem() {
	let id = counter++;

	items.push({
		value: 'Item ' + id,
		height: Math.random() < 0.8 ? 20 : 40,
	});
}

function render() {
	if (items.length > LIMIT) {
		items = items.slice(Math.max(items.length - LIMIT, 0));
	}

	ReactDOM.render(
		React.createElement(Main, {
			items,
		}),
		div,
	);
}

function Main({ items }) {
	return (
		<ScrollToBottom className="scrollContainer">
			{items.map((item, i) => {
				return (
					<div
						key={i}
						style={{
							height: item.height + 'px',
						}}
					>
						{item.value}
					</div>
				);
			})}
		</ScrollToBottom>
	);
}

function addStyle() {
	let style = `
		.scrollContainer {
			height: 400px;
			border: 1px solid gray;
		}
	`;

	let styleEl = document.createElement('style');
	styleEl.appendChild(document.createTextNode(style));

	document.head.appendChild(styleEl);
}
