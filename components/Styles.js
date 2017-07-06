var Styles = {
	statusColor:(status) => {
		return status === 'Connected' ? {color: 'green'} : {color: 'red'}
	},
	jumbStyle:() => {
		return {
			border: '2px solid orange',
			boxShadow: '30px 30px 15px gray'
		}
	},
	typeStyle:() => {
		return {
			position: "fixed",
        	top:"0",
        	left: "40%",
        	fontSize: '16px',
        	padding: '10px',
        	border: '1px solid',
        	borderRadius: '10px',
        	backgroundColor: 'rgb(54, 181, 244)'
    	}
    },
		msgStyle:() => {
			return {
				border: '1px solid black',
				borderRadius: '10px',
				backgroundColor: '#fff1b8'
			}
		},
		imgStyle:() => {
			return {
				margin: '20px',
				padding: '10px',
				height: '250px',
				width: '250px',
				border: '2px solid',
				borderRadius: '20px'
			}
		}
}

export default Styles;
