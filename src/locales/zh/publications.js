export default {
  'title': '发表论文',
  'buttons': {
    'project': '项目主页',
    'arxiv': 'ArXiv',
    'pdf': '论文PDF',
    'code': '代码仓库',
    'click': '点击查看详情',
    'abstract': '摘要',
    'contributions': '主要贡献'
  },
  'videoTitle': '项目演示视频',
  'swiperTitle': '项目图示',
  'data': [
    {
      title: 'RoboCOIN: An Open-Sourced Bimanual Robotic Data Collection for Integrated Manipulation',
      date: '2025年11月',
      image: new URL('../../assets/publications/robocoin.png', import.meta.url).href,
      description: '开源大规模双手操作机器人数据集，包含 <span class="highlight-red">15 个机器人平台</span> 与 <span class="highlight-red">18 万+ 演示数据</span>，联合 <span class="highlight-red">20 家机构</span> 共同构建',
      tags: ['机器人学', '数据集'],
      links: {
        project: 'https://flagopen.github.io/RoboCOIN/',
        arxiv: 'https://arxiv.org/abs/2511.17441',
        pdf: 'https://arxiv.org/pdf/2511.17441',
        code: 'https://github.com/FlagOpen/RoboCOIN/'
      },
      abstract: '双手操作是实现类人灵巧操作的核心能力，但由于硬件异构性，大规模、多样化的双手操作机器人数据集仍然稀缺。为解决这一问题，我们提出 RoboCOIN，一个多平台双手操作数据集，包含来自 <span class="highlight-red">15 种不同机器人平台</span> 采集的 <span class="highlight-red">18 万+ 演示数据</span>。数据集覆盖 <span class="highlight-red">16 个场景</span>（家庭、商用、工作环境），包含 <span class="highlight-red">421 个任务</span>，并按双手协作模式与物体属性系统组织。我们的核心创新是分层能力金字塔，提供多粒度标注：轨迹级概念、片段级子任务、帧级运动学信息。我们进一步开发 CoRobot 处理框架，包含机器人轨迹标记语言（RTML）、质量评估、自动标注生成与统一多平台管理。大量实验验证了 RoboCOIN 在多平台双手学习中的可靠性与有效性，在各类模型与机器人平台上均取得显著性能提升。完整数据集与框架已开源。',
      contributions: [
        '<span class="highlight-red">大规模、多平台双手数据集。</span> 提出 RoboCOIN 数据集，包含 18 万+ 演示、421 个任务、15 种机器人平台。',
        '<span class="highlight-red">分层能力金字塔标注。</span> 构建轨迹级、片段级、帧级三级标注，支持从高层概念到低层控制的多粒度学习。',
        '<span class="highlight-red">一体化数据处理框架。</span> 开发统一处理框架 CoRobot，包含 RTML 校验、自动标注工具链、多平台数据集管理与部署。'
      ],
      video: new URL('../../assets/publications/robocoin/video.mp4', import.meta.url).href,
      detailImages: [
        {
          title: 'RoboCOIN 数据集总览',
          desc: 'RoboCOIN 是面向双手操作研究的大规模多平台数据集，包含 15 种机器人、18 万+ 演示、421 个任务与 16 个场景。数据集将完全开源供社区使用。',
          url: new URL('../../assets/publications/robocoin/1.png', import.meta.url).href
        },
        {
          title: 'RoboCOIN 数据采集平台',
          desc: '(a) 双臂机器人（如 AgileX Cobot Magic）。(b) 半人形机器人（如 Realman RMC-AIDA-L）。(c) 全人形机器人（如 Unitree G1edu-u3）。所有平台均支持多视角视觉观测与灵巧操作。',
          url: new URL('../../assets/publications/robocoin/2.png', import.meta.url).href
        },
        {
          title: 'RoboCOIN 数据集统计信息',
          desc: '(a) 15 种机器人平台；(b) 16 种环境；(c) 36 种操作类型；(d) 432 种物体类别，覆盖刚性、铰接、可变形物体。',
          url: new URL('../../assets/publications/robocoin/3.png', import.meta.url).href
        },
        {
          title: 'RoboCOIN 分层能力金字塔',
          desc: '轨迹级标注定义全局概念；片段级标注将任务分解为可执行子任务；帧级标注提供稠密运动与夹持器状态。所有标注时间同步，形成统一结构。',
          url: new URL('../../assets/publications/robocoin/4.png', import.meta.url).href
        },
        {
          title: 'CoRobot 数据处理流程',
          desc: '(a) 基于 RTML 的轨迹自动校验；(b) 半自动标注工具链；(c) 一体化机器人控制与多平台数据管理平台。',
          url: new URL('../../assets/publications/robocoin/5.png', import.meta.url).href
        },
      ]
    },
    {
      title: '<span class="highlight-red">[ICLR 2026]</span> Policy Contrastive Decoding for Robotic Foundation Models',
      date: '2025年9月',
      image: new URL('../../assets/publications/pcd.png', import.meta.url).href,
      description: '适用于多种视觉-语言-动作模型的通用框架，无需训练即可实现 <span class="highlight-red">+8%~41%</span> 性能提升',
      tags: ['机器人学', '视觉-语言-动作模型', '测试时优化'],
      links: {
        project: 'https://koorye.github.io/PCD',
        arxiv: 'https://arxiv.org/abs/2505.13255',
        pdf: 'https://arxiv.org/pdf/2505.13255',
        code: 'https://github.com/Koorye/PCD/'
      },
      abstract: '机器人基础模型（通用机器人策略）具有实现灵活、通用、灵巧机器人系统的巨大潜力。尽管取得进展，我们发现现有机器人策略容易从预训练轨迹中学习伪相关，影响泛化能力。为此，我们提出**策略对比解码（PCD）**，通过对比原始与物体掩码视觉输入的动作概率分布，引导策略关注物体相关视觉线索。作为无需训练的插件式方法，PCD 可直接增强各类机器人策略，无需微调或访问模型权重。我们在三个开源机器人策略（OpenVLA、Octo、π0）上进行大量实验，仿真与现实环境均证明 PCD 的灵活性与有效性：例如在 π0 上提升 <span class="highlight-red">8%</span>（仿真）与 <span class="highlight-red">108%</span>（现实）。',
      contributions: [
        '提出 PCD，一种简单、无需训练、易部署的机器人策略伪相关缓解方案。',
        'PCD 可作为插件增强自回归与扩散类策略，无需微调或访问预训练权重。',
        '大量实验证明 PCD 在 15 个操作任务、3 个 SOTA 策略、多机器人平台上稳定有效。'
      ],
      video: new URL('../../assets/publications/pcd/video.mp4', import.meta.url).href,
      detailImages: [
        {
          url: new URL('../../assets/publications/pcd/poster.png', import.meta.url).href
        },
        {
          title: '机器人基础模型的伪相关问题',
          desc: '策略易将任务无关特征与动作关联，导致泛化下降。例如改变光照或把手位置会使 OpenVLA 性能下降 36% / 32%。(d) 为注意力可视化。',
          url: new URL('../../assets/publications/pcd/1.png', import.meta.url).href
        },
        {
          title: '策略对比解码（PCD）总览',
          desc: 'PCD 通过对比原始观测 p 与掩码观测 p̂ 的动作分布，引导模型关注物体相关区域。图中仅展示动作空间 ∆x/∆y 维度。',
          url: new URL('../../assets/publications/pcd/2.png', import.meta.url).href
        },
        {
          title: '仿真实验结果（SIMPLER）',
          desc: '使用点/框提示或 GDINO 自动标注目标。PCD 在 9 个任务上稳定大幅提升三个基线模型。',
          url: new URL('../../assets/publications/pcd/3.png', import.meta.url).href
        },
        {
          title: '现实世界实验结果',
          desc: '使用 GDINO 自动标注目标。PCD 带来 108% 性能提升，时间开销仅增加 24%。',
          url: new URL('../../assets/publications/pcd/4.png', import.meta.url).href
        },
        {
          title: '未见场景泛化性能',
          desc: 'PCD 有效缓解各类伪相关，显著提升机器人策略在新场景中的泛化能力。',
          url: new URL('../../assets/publications/pcd/5.png', import.meta.url).href
        }
      ]
    },
    {
      title: '<span class="highlight-red">[ICRA 2026]</span> InSpire: Vision-Language-Action Models with Intrinsic Spatial Reasoning',
      date: '2025年9月',
      image: new URL('../../assets/publications/inspire.png', import.meta.url).href,
      description: '降低视觉-语言-动作模型的伪相关，在已见任务提升 <span class="highlight-red">+6.2%</span>，未见任务提升 <span class="highlight-red">+10%</span>',
      tags: ['机器人学', '视觉-语言-动作模型', '空间推理'],
      links: {
        project: 'https://koorye.github.io/Inspire',
        arxiv: 'https://arxiv.org/abs/2412.11509',
        pdf: 'https://arxiv.org/pdf/2412.11509',
        code: 'https://github.com/Koorye/Inspire/'
      },
      abstract: '视觉-语言-动作模型（VLA）利用预训练视觉-语言模型将指令与观测映射到底层动作，具有构建通用机器人系统的潜力。尽管取得进展，现有 VLA 易学习任务无关的伪相关，限制泛化能力。为此，我们提出 **InSpire（内在空间推理）**，通过增强 VLA 的空间推理能力缓解伪相关影响。具体方法：在语言指令前加入空间问题“目标物体相对于机器人的方向？”，并让模型输出方向答案（左/右/上/下/前/后/已抓取），与动作预测联合监督。InSpire 可作为插件增强现有自回归 VLA，无需额外数据或其他模型。仿真与现实实验均验证其有效性。',
      contributions: [
        '提出 InSpire，缓解视觉-语言-动作模型伪相关与泛化下降问题。',
        'InSpire 以插件形式赋予 VLA 空间推理能力，无需额外数据或模型交互。',
        '在仿真与现实环境中全面验证 InSpire 的有效性与通用性。'
      ],
      video: new URL('../../assets/publications/inspire/video.mp4', import.meta.url).href,
      detailImages: [
        {
          url: new URL('../../assets/publications/inspire/poster.png', import.meta.url).href
        },
        {
          title: 'VLA 模型的伪相关问题',
          desc: '(a) 传统 VLA 依赖直接观测-动作映射，易学习伪相关。(b) InSpire 通过增强空间推理缓解伪相关。(c) InSpire 可插件式提升 SOTA 模型。',
          url: new URL('../../assets/publications/inspire/1.png', import.meta.url).href
        },
        {
          title: 'InSpire 方法总览',
          desc: '在语言指令前加入空间方位问题，让模型同时预测动作与空间关系，提升空间推理能力。',
          url: new URL('../../assets/publications/inspire/2.png', import.meta.url).href
        },
        {
          title: 'LIBERO 实验结果',
          desc: 'InSpire 在 LIBERO 基准上显著提升 miniVLA-VQ 与 π0-FAST 等 SOTA 模型性能。',
          url: new URL('../../assets/publications/inspire/3.png', import.meta.url).href
        },
        {
          title: '现实世界实验结果',
          desc: '(a)(b) InSpire 在已见/未见任务均显著提升 π0-FAST；(c) 单步时间开销。',
          url: new URL('../../assets/publications/inspire/4.png', import.meta.url).href
        },
        {
          title: '效果可视化展示',
          url: new URL('../../assets/publications/inspire/5.png', import.meta.url).href
        }
      ]
    },
    {
      title: '<span class="highlight-red">[CVPR 2025]</span> Skip Tuning: Pre-trained Vision-Language Models are Effective and Efficient Adapters Themselves',
      date: '2024年12月',
      image: new URL('../../assets/publications/skiptuning.png', import.meta.url).href,
      description: '无参数自适应方法，精度提升 <span class="highlight-red">+1.04%</span>，速度提升 <span class="highlight-red">15倍</span>，内存效率提升 <span class="highlight-red">6.4倍</span>',
      tags: ['视觉-语言模型', '迁移学习', '高效训练'],
      links: {
        arxiv: 'https://arxiv.org/abs/2412.11509',
        pdf: 'https://arxiv.org/pdf/2412.11509',
        code: 'https://github.com/Koorye/SkipTuning/'
      },
      abstract: '提示微调（PT）通过学习少量上下文向量实现视觉-语言模型（VLM）高效迁移。但我们发现：微调时冻结 VLM 既不利于知识迁移，也无法显著提升效率。进一步研究表明：降低全量微调（FT）的特征-梯度传播流长度与宽度，是实现高效知识迁移的关键。据此，我们提出 **Skip Tuning**，无需引入额外向量或适配器，仅在全量微调基础上使用层跳过（LSkip）与类别跳过（CSkip）。大量实验证明，Skip Tuning 在精度与效率上均显著优于现有 PT 与适配器方法。',
      contributions: [
        '揭示降低特征-梯度传播流的长度与宽度是实现高效迁移的关键。',
        '提出 Skip Tuning，无需额外参数或模块即可实现高效迁移。',
        '在广泛基准上验证 Skip Tuning 优于提示微调与适配器方法。'
      ],
      detailImages: [
        {
          url: new URL('../../assets/publications/skip/poster.png', import.meta.url).href
        },
        {
          title: '与 SOTA 提示微调方法对比',
          desc: 'Skip Tuning 在训练时间、内存消耗、分类精度上全面优于现有方法。',
          url: new URL('../../assets/publications/skip/1.png', import.meta.url).href
        },
        {
          title: '研究动机',
          desc: '(a) CoOp 与全量微调在参数、内存、时间、性能上对比；(b) CLIP 各层特征敏感度；(c) 类别token梯度依赖度。',
          url: new URL('../../assets/publications/skip/2.png', import.meta.url).href
        },
        {
          title: 'Skip Tuning 总览',
          desc: '通过层跳过（LSkip）与类别跳过（CSkip）减少传播量，在保持精度的同时大幅提升效率。',
          url: new URL('../../assets/publications/skip/3.png', import.meta.url).href
        },
        {
          title: '基类-新类泛化结果（11 个数据集）',
          url: new URL('../../assets/publications/skip/4.png', import.meta.url).href
        },
        {
          title: '小样本学习结果（11 个数据集）',
          url: new URL('../../assets/publications/skip/5.png', import.meta.url).href
        }
      ]
    },
    {
      title: '<span class="highlight-red">[IJCV 2026]</span> A Closer Look at Conditional Prompt Tuning for Vision-Language Models',
      date: '2024年8月',
      image: new URL('../../assets/publications/capt.png', import.meta.url).href,
      description: '揭示现有条件提示微调的核心问题，相对 SOTA 提升精度 <span class="highlight-red">3.49%</span>',
      tags: ['视觉-语言模型', '迁移学习', '提示微调'],
      links: {
        arxiv: 'https://arxiv.org/abs/2506.23856',
        pdf: 'https://arxiv.org/pdf/2506.23856',
        code: 'https://github.com/Koorye/CaPT/'
      },
      abstract: '提示微调（PT）在适配视觉-语言模型时面临基类-新类权衡（BNT）：模型在基类上越好，在新类上泛化越差。现有条件提示微调使用视觉图像信息（VII）生成动态提示，但效果有限。本文首次发现：**基于文本类别信息（TCI）的动态提示**才是解决 BNT 的关键。据此提出 **类别自适应提示微调（CaPT）**，通过学习 TCI 条件提示实现快速泛化。CaPT 可插件式增强现有 PT 方法，计算开销可忽略。在 11 个数据集上，CaPT 稳定提升 5 种 PT 基线；结合 DePT 得到的 DeCaPT 相对 SOTA 提升 <span class="highlight-red">3.49%</span>。',
      contributions: [
        '首次揭示：条件提示微调的关键是文本类别信息（TCI），而非视觉图像信息（VII）。',
        '提出 CaPT，首个专注解决 BNT 问题的 TCI 条件提示方案，可插件式集成。',
        '在 11 个数据集上验证 CaPT 在基类泛化、跨数据集、跨域场景的有效性。'
      ],
      detailImages: [
        {
          title: '不同条件提示方法对比',
          desc: '上方：5 种 PT 方法加入 CaPT 前后的调和均值精度；下方：CaPT 计算开销。',
          url: new URL('../../assets/publications/capt/1.png', import.meta.url).href
        },
        {
          title: '条件提示微调的深入分析',
          desc: '(a) CoOp；(b) CoCoOp；(c) 4 种条件输入；(d) 基类-新类泛化结果。证明 TCI 远优于 VII。',
          url: new URL('../../assets/publications/capt/2.png', import.meta.url).href
        },
        {
          title: '类别自适应提示微调（CaPT）总览',
          desc: '利用 Word2Vec 提取文本类别信息 TCI，通过 Meta-Net 生成条件提示，并用 Margin-ITM 损失增强泛化。',
          url: new URL('../../assets/publications/capt/3.png', import.meta.url).href
        },
        {
          title: 'Margin-ITM 损失设计动机',
          desc: '过度拉大基类间距会损害新类表示，因此设计温和的间隔损失。',
          url: new URL('../../assets/publications/capt/4.png', import.meta.url).href
        },
        {
          title: '11 个数据集上的基类-新类泛化性能',
          url: new URL('../../assets/publications/capt/5.png', import.meta.url).href
        }
      ]
    },
    {
      title: '<span class="highlight-red">[CVPR 2024]</span> Decoupled Prompt Tuning',
      date: '2023年11月',
      image: new URL('../../assets/publications/dept.png', import.meta.url).href,
      description: '即插即用，在各类提示微调基线上稳定带来 <span class="highlight-red">+0.67%~2.65%</span> 提升',
      tags: ['视觉-语言模型', '迁移学习', '提示微调'],
      links: {
        arxiv: 'https://arxiv.org/abs/2309.07439',
        pdf: 'https://arxiv.org/pdf/2309.07439',
        code: 'https://github.com/Koorye/DePT/'
      },
      abstract: '本文突破提示微调中的基类-新类权衡（BNT）困境：模型在基类（目标任务）上表现越好，在新任务上泛化越差。通过深度分析特征，我们发现 BNT 源于**通道偏置**：大量特征通道被基类特定知识占据，导致任务共享知识坍塌。为此提出 **解耦提示微调（DePT）**：在微调时将基类特定知识解耦到独立空间，最大程度保留任务共享知识，从而提升新任务零样本泛化。DePT 与现有方法正交，可即插即用，计算开销可忽略。在多个数据集上验证了灵活性与有效性。',
      contributions: [
        '深入揭示 BNT 问题根源为通道偏置（channel bias）。',
        '提出 DePT 解耦框架，从特征解耦角度解决 BNT，与现有方法正交兼容。',
        '在 11 个数据集上验证 DePT 可稳定提升各类基线方法。'
      ],
      detailImages: [
        {
          'url': new URL('../../assets/publications/dept/poster.png', import.meta.url).href
        },
        {
          title: 'DePT 与 SOTA 提示微调方法对比',
          desc: '6 种方法加入 DePT 前后在基类/新类任务的精度对比（11 个数据集平均）。',
          url: new URL('../../assets/publications/dept/1.png', import.meta.url).href
        },
        {
          title: 'DePT 框架示意图',
          desc: '使用通道调整迁移头（CAT）捕获基类特定知识，保留共享知识，推理时融合两路输出。',
          url: new URL('../../assets/publications/dept/2.png', import.meta.url).href
        },
        {
          title: '通道重要度分布对比',
          desc: 'DePT 显著缓解通道偏置，让通道更均衡地支持基类与新类。',
          url: new URL('../../assets/publications/dept/3.png', import.meta.url).href
        },
        {
          title: '6 种基线加入 DePT 后的泛化性能（11 个数据集）',
          url: new URL('../../assets/publications/dept/4.png', import.meta.url).href
        }
      ]
    }
  ]
}