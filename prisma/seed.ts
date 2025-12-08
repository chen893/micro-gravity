import { PrismaClient, CelebrationCategory } from "../generated/prisma";

const prisma = new PrismaClient();

const celebrationMethods = [
  // 语言类 VERBAL
  {
    category: CelebrationCategory.VERBAL,
    content: "对自己说「太棒了！」",
    emoji: "🎉",
  },
  {
    category: CelebrationCategory.VERBAL,
    content: "对自己说「我做到了！」",
    emoji: "✨",
  },
  {
    category: CelebrationCategory.VERBAL,
    content: "对自己说「就是这样！」",
    emoji: "💪",
  },
  {
    category: CelebrationCategory.VERBAL,
    content: "轻声哼一句「耶～」",
    emoji: "🎵",
  },
  {
    category: CelebrationCategory.VERBAL,
    content: "对自己说「不错哦」",
    emoji: "👍",
  },

  // 动作类 PHYSICAL
  {
    category: CelebrationCategory.PHYSICAL,
    content: "握拳轻挥",
    emoji: "✊",
  },
  {
    category: CelebrationCategory.PHYSICAL,
    content: "给自己比个大拇指",
    emoji: "👍",
  },
  {
    category: CelebrationCategory.PHYSICAL,
    content: "轻轻拍拍自己的肩膀",
    emoji: "🤗",
  },
  {
    category: CelebrationCategory.PHYSICAL,
    content: "双手击掌",
    emoji: "👏",
  },
  {
    category: CelebrationCategory.PHYSICAL,
    content: "开心地跺跺脚",
    emoji: "🦶",
  },
  {
    category: CelebrationCategory.PHYSICAL,
    content: "胜利姿势（双手举起）",
    emoji: "🙌",
  },

  // 想象类 MENTAL
  {
    category: CelebrationCategory.MENTAL,
    content: "想象烟花在脑海绽放",
    emoji: "🎆",
  },
  {
    category: CelebrationCategory.MENTAL,
    content: "想象观众为你鼓掌",
    emoji: "👏",
  },
  {
    category: CelebrationCategory.MENTAL,
    content: "想象自己站在领奖台上",
    emoji: "🏆",
  },
  {
    category: CelebrationCategory.MENTAL,
    content: "想象金色光芒环绕自己",
    emoji: "✨",
  },
  {
    category: CelebrationCategory.MENTAL,
    content: "想象未来更好的自己微笑点头",
    emoji: "😊",
  },

  // 感官类 SENSORY
  {
    category: CelebrationCategory.SENSORY,
    content: "闭眼深呼吸，感受成就感",
    emoji: "😌",
  },
  {
    category: CelebrationCategory.SENSORY,
    content: "微笑3秒钟",
    emoji: "😊",
  },
  {
    category: CelebrationCategory.SENSORY,
    content: "放松肩膀，感受轻松",
    emoji: "🧘",
  },
  {
    category: CelebrationCategory.SENSORY,
    content: "抬头看看天空/窗外",
    emoji: "🌤️",
  },
];

async function main() {
  console.log("🌱 开始初始化庆祝方式数据...");

  // 清空现有数据
  await prisma.celebrationMethod.deleteMany();

  // 插入新数据
  for (const method of celebrationMethods) {
    await prisma.celebrationMethod.create({
      data: {
        ...method,
        isBuiltIn: true,
      },
    });
  }

  console.log(`✅ 成功创建 ${celebrationMethods.length} 个庆祝方式`);

  // 统计各分类数量
  const stats = await prisma.celebrationMethod.groupBy({
    by: ["category"],
    _count: true,
  });

  console.log("\n📊 分类统计:");
  stats.forEach((s) => {
    const categoryName = {
      VERBAL: "语言类",
      PHYSICAL: "动作类",
      MENTAL: "想象类",
      SENSORY: "感官类",
    }[s.category];
    console.log(`   ${categoryName}: ${s._count} 个`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
