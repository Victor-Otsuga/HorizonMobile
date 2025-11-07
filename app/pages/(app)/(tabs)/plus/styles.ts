import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../theme/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 16,
		paddingBottom: 80,
		paddingTop: 40,
	},
	scrollContent: {
		paddingBottom: 24,
	},
	card: {
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 12,
		backgroundColor: colors.light,
	},
	modelPlaceholder: {
		height: 200,
		backgroundColor: colors.light,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modelImage: {
		width: '100%',
		height: '100%',
		opacity: 0.95,
	},
	arButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		backgroundColor: colors.primary,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	arButtonText: {
		color: colors.background,
		marginLeft: 6,
	},
	infoCard: {
		backgroundColor: colors.light,
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	title: {
		color: colors.textDark,
		fontSize: 22,
		fontWeight: '700',
	},
	subtitle: {
		color: colors.textLight,
		marginTop: 4,
	},
	rowTop: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},
	badge: {
		backgroundColor: colors.inputBackground,
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 8,
	},
	badgeText: {
		color: colors.textDark,
	},
	km: {
		color: colors.textLight,
		marginLeft: 10,
	},
	featuresRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
	},
	featureBox: {
		backgroundColor: colors.light,
		width: (width - 64) / 3,
		padding: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	featureLabel: {
		color: colors.textLight,
		marginTop: 8,
	},
	featureValue: {
		color: colors.textDark,
		marginTop: 6,
		fontWeight: '600',
	},
	rowDates: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 14,
	},
	smallLabel: {
		color: '#7f8b8f',
	},
	smallValue: {
		color: colors.textDark,
		marginTop: 6,
		fontWeight: '600',
	},
	alertsSection: {
		marginTop: 8,
		marginBottom: 18,
	},
	statusRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	statusItem: {
		alignItems: 'center',
		width: (width - 64) / 3,
	},
	statusCircleGreen: {
		width: 68,
		height: 68,
		borderRadius: 34,
		backgroundColor: '#e8f5e9',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	statusCircleYellow: {
		width: 68,
		height: 68,
		borderRadius: 34,
		backgroundColor: '#fff3e0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	statusPercent: {
		color: colors.textDark,
		fontWeight: '700',
	},
	statusLabel: {
		color: colors.textLight,
	},
	sectionTitle: {
		color: colors.background,
		fontSize: 18,
		marginTop: 12,
		marginBottom: 8,
		fontWeight: '600',
	},
	alertCard: {
		backgroundColor: colors.light,
		padding: 14,
		borderRadius: 12,
		marginBottom: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#f39c12',
	},
	alertCardSuccess: {
		backgroundColor: colors.light,
		padding: 14,
		borderRadius: 12,
		marginBottom: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#2ecc71',
	},
	alertTitle: {
		color: colors.textDark,
		fontWeight: '600',
	},
	alertSub: {
		color: colors.textLight,
		marginTop: 6,
	},
	secondaryButton: {
		borderWidth: 1,
		borderColor: colors.border,
		padding: 12,
		borderRadius: 10,
		marginTop: 8,
		alignItems: 'center',
	},
	secondaryText: {
		color: colors.textDark,
	},
	ctaButton: {
		backgroundColor: colors.Green,
		padding: 14,
		borderRadius: 12,
		alignItems: 'center',
		marginBottom: 16,
	},
	ctaText: {
		color: colors.background,
		fontWeight: '700',
		fontSize: 16,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalBox: {
		width: '90%',
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 10,
	},
	historyItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingVertical: 8,
	},
	historyDate: {
		fontSize: 14,
		color: '#555',
	},
	historyService: {
		fontSize: 15,
		fontWeight: '500',
		color: '#333',
	},
	noteInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 10,
		height: 100,
		textAlignVertical: 'top',
	},
	noteButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
	},
	closeButton: {
		backgroundColor: '#ccc',
		padding: 14,
		borderRadius: 12,
		alignItems: 'center',
		marginBottom: 16,
	},
	closeButtonText: {
		color: '#fff',
		fontWeight: '600',
		
	},

});