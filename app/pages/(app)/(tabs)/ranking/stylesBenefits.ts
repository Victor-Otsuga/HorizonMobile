import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 20,
        paddingTop: 50,
       

    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#222',
        textAlign: 'center',
        marginBottom: 6,
    },
    progressBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    currentLevel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    highlight: {
        color: '#FFC107',
    },
    pointsText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFC107',
    },
    progressNote: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    benefitCard: {
        borderRadius: 14,
        padding: 16,
        marginVertical: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    levelTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    currentBadge: {
        backgroundColor: '#FFC107',
        color: '#000',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: '600',
    },
    sectionLabel: {
        marginTop: 6,
        fontSize: 13,
        color: '#444',
        fontWeight: '600',
    },
    sectionValue: {
        fontSize: 14,
        marginBottom: 4,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 8,
    },
    benefitItem: {
        fontSize: 13,
        color: '#333',
        marginVertical: 2,
    },
    actionButton: {
        marginTop: 12,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default styles;
