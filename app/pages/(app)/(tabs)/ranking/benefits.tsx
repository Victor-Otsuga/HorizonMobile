import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import styles from '../ranking/stylesBenefits';
import { router } from 'expo-router';

export default function BenefitsScreen() {
    const currentLevel = 'Ouro';
    const currentPoints = 820;
    const nextLevelPoints = 1000;

    const levels = [
        {
            name: 'Prata',
            emoji: '🥈',
            color: '#E5E5E5',
            textColor: '#555',
            discount: '5%',
            events: 'Convites regionais',
            recommend: 'Baixa prioridade',
            benefits: [
                'Acesso a eventos regionais',
                'Cupons de desconto',
                'Suporte básico',
                'Status em perfil',
            ],
        },
        {
            name: 'Ouro',
            emoji: '🥇',
            color: '#FFE9B3',
            textColor: '#7A5A00',
            discount: '10%',
            events: 'Eventos nacionais',
            recommend: 'Alta prioridade',
            benefits: [
                'Acesso a eventos nacionais',
                'Descontos premium',
                'Suporte prioritário',
                'Convites VIP',
                'Histórico de transações',
            ],
        },
        {
            name: 'Diamante',
            emoji: '💎',
            color: '#CFF4FF',
            textColor: '#004C6D',
            discount: '15%',
            events: 'Acesso VIP',
            recommend: 'Destaque máximo',
            benefits: [
                'Acesso VIP a todos os eventos',
                'Descontos até 15%',
                'Suporte 24/7 dedicado',
                'Convites para lançamentos',
                'Consultor pessoal',
                'Benefícios especiais',
            ],
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 140 }}>
            <Pressable
                onPress={() => router.push('./')}
                style={{
                    alignSelf: 'flex-start',
                    marginBottom: 10,
                    marginLeft: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    backgroundColor: '#EEE',
                    borderRadius: 8,
                }}
            >
                <Text style={{ fontSize: 16, color: '#333' }}>Voltar</Text>
            </Pressable>
            <Text style={styles.title}>Seus Benefícios</Text>

            <View style={styles.progressBox}>
                <Text style={styles.currentLevel}>Nível atual: <Text style={styles.highlight}>{currentLevel}</Text></Text>
                <Text style={styles.pointsText}>
                    {currentPoints} / {nextLevelPoints} pontos
                </Text>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${(currentPoints / nextLevelPoints) * 100}%` },
                        ]}
                    />
                </View>
                <Text style={styles.progressNote}>
                    Faltam {nextLevelPoints - currentPoints} pontos para o próximo nível
                </Text>
            </View>

            {levels.map((level, index) => (
                <View
                    key={index}
                    style={[
                        styles.benefitCard,
                        {
                            backgroundColor: level.color,
                            borderColor: level.name === currentLevel ? '#FFC107' : '#ddd',
                            borderWidth: level.name === currentLevel ? 2 : 1,
                        },
                    ]}
                >
                    <View style={styles.cardHeader}>
                        <Text style={[styles.levelTitle, { color: level.textColor }]}>
                            {level.emoji} {level.name}
                        </Text>
                        {level.name === currentLevel && (
                            <Text style={styles.currentBadge}>Atual</Text>
                        )}
                    </View>

                    <Text style={styles.sectionLabel}>Desconto</Text>
                    <Text style={styles.sectionValue}>{level.discount} de desconto</Text>

                    <Text style={styles.sectionLabel}>Eventos</Text>
                    <Text style={styles.sectionValue}>{level.events}</Text>

                    <Text style={styles.sectionLabel}>Recomendações</Text>
                    <Text style={styles.sectionValue}>{level.recommend}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionLabel}>O que você ganha:</Text>
                    {level.benefits.map((b, i) => (
                        <Text key={i} style={styles.benefitItem}>✔️ {b}</Text>
                    ))}

                    <Pressable
                        style={[
                            styles.actionButton,
                            { backgroundColor: level.name === currentLevel ? '#FFC107' : '#eee' },
                        ]}
                    >
                        <Text
                            style={{
                                color: level.name === currentLevel ? '#000' : '#555',
                                fontWeight: '600',
                            }}
                        >
                            {level.name === currentLevel ? 'Nível Atual' :
                                level.name === 'Prata' ? 'Nível Conquistado' : 'Próximo Nível'}
                        </Text>
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    );
}
