/**
 * 庆祝方式库 - 基于福格《Tiny Habits》原著
 * 100种庆祝方式，分4类：语言、动作、想象、感官
 */

export type CelebrationCategory = "VERBAL" | "PHYSICAL" | "MENTAL" | "SENSORY";

export interface CelebrationMethod {
  category: CelebrationCategory;
  content: string;
  emoji: string;
}

/**
 * 100种庆祝方式
 * 福格原著："庆祝是习惯养成的肥料，每一次庆祝都会让相应的习惯牢牢扎根"
 */
export const CELEBRATION_METHODS: CelebrationMethod[] = [
  // ============ 语言类 (VERBAL) - 25种 ============
  { category: "VERBAL", content: '说"太棒了！"', emoji: "🎉" },
  { category: "VERBAL", content: '说"Yes！"', emoji: "✊" },
  { category: "VERBAL", content: '说"我做到了！"', emoji: "🏆" },
  { category: "VERBAL", content: '说"干得好！"', emoji: "👏" },
  { category: "VERBAL", content: '对自己说"我很棒"', emoji: "⭐" },
  { category: "VERBAL", content: "哼几句喜欢的歌", emoji: "🎵" },
  { category: "VERBAL", content: '说"这就是我！"', emoji: "💪" },
  { category: "VERBAL", content: '轻声说"谢谢自己"', emoji: "🙏" },
  { category: "VERBAL", content: '说"又进步了！"', emoji: "📈" },
  { category: "VERBAL", content: '说"太厉害了！"', emoji: "🔥" },
  { category: "VERBAL", content: '说"Awesome！"', emoji: "🌟" },
  { category: "VERBAL", content: '说"搞定！"', emoji: "✅" },
  { category: "VERBAL", content: '说"我可以的！"', emoji: "💯" },
  { category: "VERBAL", content: '说"继续保持！"', emoji: "🚀" },
  { category: "VERBAL", content: '说"真不错！"', emoji: "👌" },
  { category: "VERBAL", content: '说"Bravo！"', emoji: "🎭" },
  { category: "VERBAL", content: '说"Perfect！"', emoji: "💎" },
  { category: "VERBAL", content: '说"我爱自己"', emoji: "❤️" },
  { category: "VERBAL", content: "吹个口哨", emoji: "🎶" },
  { category: "VERBAL", content: '说"这感觉真好"', emoji: "😌" },
  { category: "VERBAL", content: '说"我正在变强"', emoji: "🦸" },
  { category: "VERBAL", content: '说"又是美好的一天"', emoji: "🌅" },
  { category: "VERBAL", content: '说"我值得表扬"', emoji: "🎖️" },
  { category: "VERBAL", content: '说"小步前进！"', emoji: "👣" },
  { category: "VERBAL", content: '说"我为自己骄傲"', emoji: "🦁" },

  // ============ 动作类 (PHYSICAL) - 30种 ============
  { category: "PHYSICAL", content: "挥舞拳头", emoji: "💪" },
  { category: "PHYSICAL", content: "给自己击掌", emoji: "🙌" },
  { category: "PHYSICAL", content: "双手比赞", emoji: "👍" },
  { category: "PHYSICAL", content: "跳一小段舞", emoji: "💃" },
  { category: "PHYSICAL", content: "微微点头", emoji: "😌" },
  { category: "PHYSICAL", content: "展露大大的微笑", emoji: "😊" },
  { category: "PHYSICAL", content: "打个响指", emoji: "🫰" },
  { category: "PHYSICAL", content: "拍拍手", emoji: "👏" },
  { category: "PHYSICAL", content: "伸个懒腰", emoji: "🙆" },
  { category: "PHYSICAL", content: "做个胜利手势", emoji: "✌️" },
  { category: "PHYSICAL", content: "轻轻跺跺脚", emoji: "🦶" },
  { category: "PHYSICAL", content: "抱抱自己", emoji: "🤗" },
  { category: "PHYSICAL", content: "拍拍肩膀", emoji: "🫱" },
  { category: "PHYSICAL", content: "做个OK手势", emoji: "👌" },
  { category: "PHYSICAL", content: "双手举过头顶", emoji: "🙆‍♂️" },
  { category: "PHYSICAL", content: "做个小小的跳跃", emoji: "🤸" },
  { category: "PHYSICAL", content: "转个小圈圈", emoji: "🔄" },
  { category: "PHYSICAL", content: "握紧拳头再松开", emoji: "✊" },
  { category: "PHYSICAL", content: "拍拍胸口", emoji: "💓" },
  { category: "PHYSICAL", content: "做个敬礼手势", emoji: "🫡" },
  { category: "PHYSICAL", content: "揉揉脸颊", emoji: "😊" },
  { category: "PHYSICAL", content: "轻轻跳一下", emoji: "⬆️" },
  { category: "PHYSICAL", content: "做个飞吻动作", emoji: "😘" },
  { category: "PHYSICAL", content: "双手交叉放胸前", emoji: "🙅" },
  { category: "PHYSICAL", content: "原地小跑几步", emoji: "🏃" },
  { category: "PHYSICAL", content: "拍拍大腿", emoji: "🦵" },
  { category: "PHYSICAL", content: "做个比心手势", emoji: "🫶" },
  { category: "PHYSICAL", content: "甩甩头发", emoji: "💁" },
  { category: "PHYSICAL", content: "摇摆身体", emoji: "🕺" },
  { category: "PHYSICAL", content: "做个rock手势", emoji: "🤘" },

  // ============ 想象类 (MENTAL) - 25种 ============
  { category: "MENTAL", content: "想象烟花为你绽放", emoji: "🎆" },
  { category: "MENTAL", content: "想象观众为你欢呼", emoji: "👥" },
  { category: "MENTAL", content: "想象颁奖典礼", emoji: "🏅" },
  { category: "MENTAL", content: "想象妈妈给你拥抱", emoji: "🤗" },
  { category: "MENTAL", content: "想象孩子们为你鼓掌", emoji: "👶" },
  { category: "MENTAL", content: "想象最好的朋友为你高兴", emoji: "👯" },
  { category: "MENTAL", content: "想象自己站在领奖台上", emoji: "🥇" },
  { category: "MENTAL", content: "想象彩虹出现", emoji: "🌈" },
  { category: "MENTAL", content: "想象阳光照耀着你", emoji: "☀️" },
  { category: "MENTAL", content: "想象自己在星空下", emoji: "🌌" },
  { category: "MENTAL", content: "想象蝴蝶围绕着你飞舞", emoji: "🦋" },
  { category: "MENTAL", content: "想象自己是超级英雄", emoji: "🦸" },
  { category: "MENTAL", content: "想象未来成功的自己", emoji: "🔮" },
  { category: "MENTAL", content: "想象全世界都在为你庆祝", emoji: "🌍" },
  { category: "MENTAL", content: "想象温暖的光包围着你", emoji: "✨" },
  { category: "MENTAL", content: "想象自己在海边奔跑", emoji: "🏖️" },
  { category: "MENTAL", content: "想象花瓣飘落", emoji: "🌸" },
  { category: "MENTAL", content: "想象金色的光芒", emoji: "💫" },
  { category: "MENTAL", content: "想象自己在云端漫步", emoji: "☁️" },
  { category: "MENTAL", content: "想象心爱的宠物在撒娇", emoji: "🐕" },
  { category: "MENTAL", content: "想象自己获得诺贝尔奖", emoji: "🎖️" },
  { category: "MENTAL", content: "想象彩带飞舞", emoji: "🎊" },
  { category: "MENTAL", content: "想象自己是冠军", emoji: "🏆" },
  { category: "MENTAL", content: "想象生命之树在生长", emoji: "🌳" },
  { category: "MENTAL", content: "想象心中的火焰燃烧", emoji: "🔥" },

  // ============ 感官类 (SENSORY) - 20种 ============
  { category: "SENSORY", content: "深呼吸，感受满足", emoji: "🌬️" },
  { category: "SENSORY", content: "闭眼感受成就感", emoji: "😌" },
  { category: "SENSORY", content: "看看窗外的天空", emoji: "🌤️" },
  { category: "SENSORY", content: "感受心跳的节奏", emoji: "💓" },
  { category: "SENSORY", content: "用手心感受温暖", emoji: "🤲" },
  { category: "SENSORY", content: "闻一闻喜欢的香味", emoji: "👃" },
  { category: "SENSORY", content: "听一段喜欢的音乐", emoji: "🎧" },
  { category: "SENSORY", content: "喝一口温水", emoji: "💧" },
  { category: "SENSORY", content: "抚摸柔软的物品", emoji: "🧸" },
  { category: "SENSORY", content: "感受脚踏实地的感觉", emoji: "🦶" },
  { category: "SENSORY", content: "看看绿色植物", emoji: "🌿" },
  { category: "SENSORY", content: "感受微风拂面", emoji: "🍃" },
  { category: "SENSORY", content: "吃一小口喜欢的食物", emoji: "🍫" },
  { category: "SENSORY", content: "感受身体的放松", emoji: "🧘" },
  { category: "SENSORY", content: "闭眼聆听周围的声音", emoji: "👂" },
  { category: "SENSORY", content: "看看喜欢的照片", emoji: "📷" },
  { category: "SENSORY", content: "触摸凉爽的表面", emoji: "❄️" },
  { category: "SENSORY", content: "感受阳光的温度", emoji: "🌞" },
  { category: "SENSORY", content: "做三次缓慢的呼吸", emoji: "🌊" },
  { category: "SENSORY", content: "感受嘴角上扬的感觉", emoji: "😊" },
];

/**
 * 按分类获取庆祝方式
 */
export function getCelebrationsByCategory(
  category: CelebrationCategory,
): CelebrationMethod[] {
  return CELEBRATION_METHODS.filter((m) => m.category === category);
}

/**
 * 获取分类名称
 */
export function getCategoryName(category: CelebrationCategory): string {
  const names: Record<CelebrationCategory, string> = {
    VERBAL: "语言类",
    PHYSICAL: "动作类",
    MENTAL: "想象类",
    SENSORY: "感官类",
  };
  return names[category];
}

/**
 * 获取分类描述
 */
export function getCategoryDescription(category: CelebrationCategory): string {
  const descriptions: Record<CelebrationCategory, string> = {
    VERBAL: '用语言表达喜悦，如说"太棒了"',
    PHYSICAL: "用身体动作庆祝，如挥拳、跳舞",
    MENTAL: "用想象创造愉悦，如想象烟花绽放",
    SENSORY: "用感官体验满足，如深呼吸、闭眼",
  };
  return descriptions[category];
}

/**
 * 获取随机庆祝方式
 */
export function getRandomCelebration(
  category?: CelebrationCategory,
): CelebrationMethod {
  const methods = category
    ? getCelebrationsByCategory(category)
    : CELEBRATION_METHODS;
  return methods[Math.floor(Math.random() * methods.length)]!;
}

/**
 * 获取推荐的庆祝方式（每个分类各一个）
 */
export function getRecommendedCelebrations(): CelebrationMethod[] {
  const categories: CelebrationCategory[] = [
    "VERBAL",
    "PHYSICAL",
    "MENTAL",
    "SENSORY",
  ];
  return categories.map((category) => getRandomCelebration(category));
}

/**
 * 默认的快捷庆祝方式（用于打卡成功弹窗）
 */
export const DEFAULT_QUICK_CELEBRATIONS: CelebrationMethod[] = [
  { category: "PHYSICAL", content: "挥舞拳头", emoji: "💪" },
  { category: "VERBAL", content: "哼几句喜欢的歌", emoji: "🎵" },
  { category: "PHYSICAL", content: "展露大大的微笑", emoji: "😊" },
  { category: "MENTAL", content: "想象烟花为你绽放", emoji: "✨" },
];
