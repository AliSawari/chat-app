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
		},
		p:() => {
			return {
				margin: '0px 5px 0px 5px',
				padding: '10px',
				border: '2px solid #1bd9df',
				borderRadius: '10px',
				display: 'inline'
			}
		},
		p2:() => {
			return {
				border: '1px solid #8fff78',
				backgroundColor: '#8fff78',
				width: '200px',
				padding: '15px',
				borderRadius: '15px',
				marginBottom: '20px'
			}
		}
}

export default Styles;
