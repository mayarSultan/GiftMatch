import {
  Cake,
  Heart,
  PartyPopper,
  Gift,
  CalendarHeart,
  User,
  Users,
  Baby,
  Briefcase,
  UserRound,
  School,
  GraduationCap,
  Sparkle,
  Landmark,
  Wallet,
  CircleDollarSign,
  Banknote,
  Gem,
  Wrench,
  HeartHandshake,
  Drama,
  Crown,
} from 'lucide-react'
import type { QuizQuestion } from '@/types/quiz'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'occasion',
    title: "What's the occasion?",
    subtitle: 'This helps us set the right tone for our picks.',
    options: [
      { value: 'birthday', label: 'Birthday', icon: Cake },
      { value: 'anniversary', label: 'Anniversary', icon: Heart },
      { value: 'holiday', label: 'Holiday', icon: PartyPopper },
      { value: 'just-because', label: 'Just because', icon: Gift },
      { value: 'wedding', label: 'Wedding', icon: CalendarHeart },
    ],
  },
  {
    id: 'recipient',
    title: "Who's it for?",
    options: [
      { value: 'partner', label: 'Partner', icon: Heart },
      { value: 'friend', label: 'Friend', icon: Users },
      { value: 'parent', label: 'Parent', icon: User },
      { value: 'sibling', label: 'Sibling', icon: UserRound },
      { value: 'coworker', label: 'Coworker', icon: Briefcase },
      { value: 'kid', label: 'Kid', icon: Baby },
    ],
  },
  {
    id: 'age',
    title: 'What age range are they?',
    options: [
      { value: 'kid', label: 'Under 12', icon: School },
      { value: 'teen', label: '13–19', icon: GraduationCap },
      { value: 'young-adult', label: '20–35', icon: Sparkle },
      { value: 'adult', label: '36–60', icon: Landmark },
      { value: 'senior', label: '60+', icon: UserRound },
    ],
  },
  {
    id: 'budget',
    title: "What's your budget?",
    options: [
      { value: 'under-25', label: 'Under $25', icon: Wallet },
      { value: '25-50', label: '$25–$50', icon: CircleDollarSign },
      { value: '50-100', label: '$50–$100', icon: Banknote },
      { value: '100-plus', label: '$100+', icon: Gem },
    ],
  },
  {
    id: 'style',
    title: 'Pick their style.',
    subtitle: 'Go with your gut — there is no wrong answer.',
    options: [
      { value: 'practical', label: 'Practical', icon: Wrench },
      { value: 'sentimental', label: 'Sentimental', icon: HeartHandshake },
      { value: 'quirky', label: 'Fun & quirky', icon: Drama },
      { value: 'luxury', label: 'Luxury', icon: Crown },
    ],
  },
]
