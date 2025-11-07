import React, { useMemo } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

export default function RankingScreen() {
  const router = useRouter();

  // Exemplo: pontos atuais do mecânico (em produção viria da API)
  const points = 1860;

  // Define o nível e benefícios conforme os pontos — alinhado à tela Benefits
  const { level, color, nextGoal, benefits } = useMemo(() => {
    if (points < 1000) {
      return {
        level: 'Prata',
        color: '#B0BEC5',
        nextGoal: 1000,
        benefits: [
          '5% de desconto em peças e serviços',
          'Convites para eventos regionais',
          'Recomendações de baixa prioridade',
        ],
      };
    } else if (points < 2000) {
      return {
        level: 'Ouro',
        color: '#FFD700',
        nextGoal: 2000,
        benefits: [
          '10% de desconto em peças e serviços',
          'Acesso a eventos nacionais',
          'Alta prioridade nas recomendações',
          'Convites VIP e suporte prioritário',
        ],
      };
    } else {
      return {
        level: 'Diamante',
        color: '#00BCD4',
        nextGoal: null,
        benefits: [
          '15% de desconto em peças e serviços',
          'Acesso VIP a todos os eventos',
          'Destaque máximo nas recomendações',
          'Suporte 24/7 e benefícios exclusivos',
        ],
      };
    }
  }, [points]);

  const progress = nextGoal ? (points / nextGoal) * 100 : 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking e Benefícios</Text>
      <Text style={styles.subtitle}>
        Acumule pontos conforme realiza atendimentos e avance de nível para desbloquear mais vantagens.
      </Text>

      <View style={styles.card}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/10.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Victor Augusto</Text>
          <Text style={styles.points}>
            Pontos acumulados:{' '}
            <Text style={styles.pointsValue}>{points}</Text>
          </Text>

          <View style={[styles.badge, { backgroundColor: color + '22' }]}>
            <FontAwesome name="trophy" size={16} color={color} />
            <Text style={[styles.badgeText, { color }]}>Nível {level}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress}%`, backgroundColor: color },
            ]}
          />
        </View>
        {nextGoal ? (
          <Text style={styles.progressText}>
            Faltam {nextGoal - points} pts para o nível{' '}
            {level === 'Prata' ? 'Ouro' : 'Diamante'}
          </Text>
        ) : (
          <Text style={styles.progressText}>Você atingiu o nível máximo 🎉</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Benefícios do seu nível</Text>
      {benefits.map((b, index) => (
        <View key={index} style={styles.benefitItem}>
          <FontAwesome
            name="check-circle"
            size={18}
            color={color}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.benefitText}>{b}</Text>
        </View>
      ))}

      <Pressable
        style={styles.ctaButton}
        onPress={() => router.push('./ranking/benefits')}
      >
        <Text style={styles.ctaText}>Ver todos os benefícios</Text>
      </Pressable>
    </View>
  );
}
