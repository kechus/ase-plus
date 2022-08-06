import { StyleSheet, Text, Pressable, Modal } from "react-native";
import { View } from "react-native";

const ClassInfoModal = ({ classInfo, onModalHide, visible }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				onModalHide();
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>Materia: {classInfo.materia}</Text>
					<Text style={styles.modalText}>Salón: {classInfo.salon}</Text>
					<Text style={styles.modalText}>Nombre: {classInfo.nombre}</Text>
					<Text style={styles.modalText}>Grupo: {classInfo.grupo}</Text>
					<Text style={styles.modalText}>Edificio: {classInfo.edificio}</Text>
					<Pressable
						style={[styles.button, styles.buttonClose]}
						onPress={() => onModalHide()}
					>
						<Text style={styles.textStyle}>Cerrar</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '80%',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default ClassInfoModal;
