import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

interface INumberRange {
	onFromChange: (value: number) => void,
	onToChange: (value: number) => void,
	from?: number,
	to?: number,
}

export default class NumberRange extends React.Component<INumberRange> {
	render() {
		const { onToChange, onFromChange, from, to } = this.props;

		return (<div style={{ width: "100%" }}>
			<TextField
				id="standart-number"
				value={from || ''}
				onChange={(e: any) => { onFromChange(e.target.value) }}
				type="number"
				label="From"
				placeholder="$"
				InputProps={{style:{display: 'inline', marginRight: '15px'}}}
				inputProps={{style:{width: '75px', padding: '7px'}, }}
				InputLabelProps={{
					shrink: true,
				}}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				id="standart-number"
				value={to || ''}
				onChange={(e: any) => { onToChange(e.target.value) }}
				type="number"
				placeholder="$"
				label="To"
				InputProps={{style:{display: 'inline'}}}							
				inputProps={{style:{width: '75px', padding: '7px'}}}							
				InputLabelProps={{
					shrink: true,
				}}
				margin="normal"
				variant="outlined"
			/>
		</div>)
	}
}
