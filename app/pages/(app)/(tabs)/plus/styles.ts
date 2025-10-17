import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../../theme/colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0b0f13',
		padding: 16,
	},
	card: {
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 12,
	},
	modelPlaceholder: {
		height: 200,
		backgroundColor: '#0f1417',
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
		backgroundColor: '#081018',
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	title: {
		color: colors.background,
		fontSize: 22,
		fontWeight: '700',
	},
	subtitle: {
		color: '#9aa0a6',
		marginTop: 4,
	},
	rowTop: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},
	badge: {
		backgroundColor: '#0c1a23',
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 8,
	},
	badgeText: {
		color: '#cfd8dc',
	},
	km: {
		color: '#8a969a',
		marginLeft: 10,
	},
	featuresRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
	},
	featureBox: {
		backgroundColor: '#071217',
		width: (width - 64) / 3,
		padding: 12,
		borderRadius: 10,
		alignItems: 'center',
	},
	featureLabel: {
		color: '#9aa0a6',
		marginTop: 8,
	},
	featureValue: {
		color: colors.background,
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
		color: colors.background,
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
		backgroundColor: '#0b2f1e',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	statusCircleYellow: {
		width: 68,
		height: 68,
		borderRadius: 34,
		backgroundColor: '#3a2a0b',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 8,
	},
	statusPercent: {
		color: colors.background,
		fontWeight: '700',
	},
	statusLabel: {
		color: '#9aa0a6',
	},
	sectionTitle: {
		color: colors.background,
		fontSize: 18,
		marginTop: 12,
		marginBottom: 8,
		fontWeight: '600',
	},
	alertCard: {
		backgroundColor: '#071217',
		padding: 14,
		borderRadius: 12,
		marginBottom: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#f39c12',
	},
	alertCardSuccess: {
		backgroundColor: '#071217',
		padding: 14,
		borderRadius: 12,
		marginBottom: 8,
		borderLeftWidth: 4,
		borderLeftColor: '#2ecc71',
	},
	alertTitle: {
		color: colors.background,
		fontWeight: '600',
	},
	alertSub: {
		color: '#9aa0a6',
		marginTop: 6,
	},
	secondaryButton: {
		borderWidth: 1,
		borderColor: '#102029',
		padding: 12,
		borderRadius: 10,
		marginTop: 8,
		alignItems: 'center',
	},
	secondaryText: {
		color: colors.background,
	},
	ctaButton: {
		backgroundColor: colors.primary,
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
});