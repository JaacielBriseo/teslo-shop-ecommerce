import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface Props {
	currentValue: number;
	maxValue: number;

	//*Methods
	updateCartProductQuantity: (value: number) => void;
}
export const ItemCounter: React.FC<Props> = ({ currentValue, maxValue, updateCartProductQuantity }) => {
	const addOrRemove = (value: number) => {
		if (value === -1) {
			if (currentValue === 1) return;

			return updateCartProductQuantity(currentValue - 1);
		}

		if (currentValue >= maxValue) return;

		updateCartProductQuantity(currentValue + 1);
	};
	return (
		<Box display='flex' alignItems='center'>
			<IconButton onClick={() => addOrRemove(-1)}>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
			<IconButton onClick={() => addOrRemove(+1)} disabled={currentValue === maxValue}>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};
