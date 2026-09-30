import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  BookOpen,
  CheckSquare,
  ShieldAlert,
  PlusCircle,
  TrendingDown,
  Percent,
  Award,
  Hash,
  Filter,
  Trash2,
  Download,
  Upload,
  Brain,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Activity,
  DollarSign,
  ChevronRight,
  Sparkles,
  PieChart as PieIcon,
  RotateCcw
} from 'lucide-react';

const SAMPLE_TRADES = [
  {
    id: 'tr-1',
    date: '2026-09-28',
    time: '09:30',
    symbol: 'BANKNIFTY',
    direction: 'LONG',
    entry: 52400,
    exit: 52850,
    quantity: 15,
    risk: 2000,
    pnl: 6750,
    rr: '1:3.3',
    strategy: 'Breakout + Volume',
    executionType: 'Market',
    outcome: 'Target',
    mindsetScore: 92,
    psychology: {
      overconfident: false,
      emotional: false,
      htfAlignment: true,
      setupClass: 'Class A',
      onPC: true,
      backtested: true,
      confidence: 'High',
      sequence: '1st Trade',
      slTargetClear: true,
      fomo: false,
      impatient: false,
      timepass: false
    }
  },
  {
    id: 'tr-2',
    date: '2026-09-28',
    time: '11:15',
    symbol: 'NIFTY',
    direction: 'SHORT',
    entry: 24800,
    exit: 24860,
    quantity: 50,
    risk: 1500,
    pnl: -3000,
    rr: '1:2',
    strategy: 'VWAP Rejection',
    executionType: 'Limit',
    outcome: 'SL',
    mindsetScore: 58,
    psychology: {
      overconfident: true,
      emotional: true,
      htfAlignment: false,
      setupClass: 'Class C',
      onPC: true,
      backtested: false,
      confidence: 'Low',
      sequence: '2nd Trade',
      slTargetClear: true,
      fomo: true,
      impatient: true,
      timepass: false
    }
  },
  {
    id: 'tr-3',
    date: '2026-09-29',
    time: '10:00',
    symbol: 'RELIANCE',
    direction: 'LONG',
    entry: 2950,
    exit: 2990,
    quantity: 100,
    risk: 2000,
    pnl: 4000,
    rr: '1:2',
    strategy: 'EMA Pullback',
    executionType: 'Limit',
    outcome: 'Trail Target',
    mindsetScore: 85,
    psychology: {
      overconfident: false,
      emotional: false,
      htfAlignment: true,
      setupClass: 'Class A',
      onPC: true,
      backtested: true,
      confidence: 'High',
      sequence: '1st Trade',
      slTargetClear: true,
      fomo: false,
      impatient: false,
      timepass: false
    }
  },
  {
    id: 'tr-4',
    date: '2026-09-29',
    time: '14:20',
    symbol: 'HDFCBANK',
    direction: 'LONG',
    entry: 1640,
    exit: 1640,
    quantity: 200,
    risk: 1500,
    pnl: 0,
    rr: '1:2.5',
    strategy: 'Support Rejection',
    executionType: 'Limit',
    outcome: 'CTC',
    mindsetScore: 75,
    psychology: {
      overconfident: false,
      emotional: false,
      htfAlignment: true,
      setupClass: 'Class B',
      onPC: true,
      backtested: true,
      confidence: 'Med',
      sequence: '2nd Trade',
      slTargetClear: true,
      fomo: false,
      impatient: false,
      timepass: false
    }
  },
  {
    id: 'tr-5',
    date: '2026-09-30',
    time: '09:45',
    symbol: 'TATASTEEL',
    direction: 'SHORT',
    entry: 155,
    exit: 150,
    quantity: 1000,
    risk: 2500,
    pnl: 5000,
    rr: '1:2',
    strategy: 'Breakout + Volume',
    executionType: 'Market',
    outcome: 'Target',
    mindsetScore: 92,
    psychology: {
      overconfident: false,
      emotional: false,
      htfAlignment: true,
      setupClass: 'Class A',
      onPC: true,
      backtested: true,
      confidence: 'High',
      sequence: '1st Trade',
      slTargetClear: true,
      fomo: false,
      impatient: false,
      timepass: false
    }
  },
  {
    id: 'tr-6',
    date: '2026-09-30',
    time: '13:10',
    symbol: 'INFY',
    direction: 'LONG',
    entry: 1880,
    exit: 1880,
    quantity: 150,
    risk: 1800,
    pnl: 0,
    rr: '1:2',
    strategy: 'EMA Pullback',
    executionType: 'Limit',
    outcome: 'Missed Target',
    mindsetScore: 60,
    psychology: {
      overconfident: false,
      emotional: false,
      htfAlignment: false,
      setupClass: 'Class B',
      onPC: false,
      backtested: true,
      confidence: 'Med',
      sequence: '3rd+ Trade',
      slTargetClear: true,
      fomo: true,
      impatient: true,
      timepass: false
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trades, setTrades] = useState(() => {
    try {
      const saved = localStorage.getItem('kaizen_tradediary_trades');
      return saved ? JSON.parse(saved) : SAMPLE_TRADES;
    } catch (e) {
      return SAMPLE_TRADES;
    }
  });

  const [filterType, setFilterType] = useState('ALL');
  const [timeframe, setTimeframe] = useState('MONTH');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kaizen_tradediary_trades', JSON.stringify(trades));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [trades]);

  const defaultFormData = {
    date: new Date().toISOString().split('T')[0],
    time: '09:30',
    symbol: 'BANKNIFTY',
    direction: 'LONG',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    riskAmount: '2000',
    targetAmount: '4000',
    strategy: 'Breakout + Volume',
    executionType: 'Limit',
    outcome: 'Target',
    // 12-parameter psychology checklist
    overconfident: false,
    emotional: false,
    htfAlignment: true,
    setupClass: 'Class A',
    onPC: true,
    backtested: true,
    confidence: 'High',
    sequence: '1st Trade',
    slTargetClear: true,
    fomo: false,
    impatient: false,
    timepass: false
  };

  const [formData, setFormData] = useState(defaultFormData);

  const calculateMindsetScore = (data) => {
    let score = 100;
    if (data.overconfident) score -= 15;
    if (data.emotional) score -= 20;
    if (!data.htfAlignment) score -= 15;
    if (data.setupClass === 'Class B') score -= 10;
    if (data.setupClass === 'Class C') score -= 25;
    if (!data.onPC) score -= 10;
    if (!data.backtested) score -= 15;
    if (data.confidence === 'Med') score -= 5;
    if (data.confidence === 'Low') score -= 15;
    if (data.sequence === '2nd Trade') score -= 5;
    if (data.sequence === '3rd+ Trade') score -= 15;
    if (!data.slTargetClear) score -= 20;
    if (data.fomo) score -= 20;
    if (data.impatient) score -= 15;
    if (data.timepass) score -= 30;

    return Math.max(0, score);
  };

  const currentMindsetScore = useMemo(() => calculateMindsetScore(formData), [formData]);

  const systemDecision = useMemo(() => {
    if (currentMindsetScore >= 80) {
      return { status: 'ALLOW_FULL', label: 'ALLOW: Full Quantity', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
    } else if (currentMindsetScore >= 60) {
      return { status: 'ALLOW_HALF', label: 'ALLOW: Half Quantity', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    } else {
      return { status: 'HARD_REJECT', label: 'HARD REJECT (DO NOT TAKE)', color: 'bg-rose-500/20 text-rose-400 border-rose-500/40' };
    }
  }, [currentMindsetScore]);

  const metrics = useMemo(() => {
    const totalTrades = trades.length;
    let totalPnL = 0;
    let winCount = 0;
    let lossCount = 0;
    let highestProfit = 0;
    let totalWinAmount = 0;
    let totalLossAmount = 0;
    let totalMindsetScore = 0;

    trades.forEach((t) => {
      const pnl = Number(t.pnl) || 0;
      totalPnL += pnl;
      if (pnl > 0) {
        winCount++;
        totalWinAmount += pnl;
        if (pnl > highestProfit) highestProfit = pnl;
      } else if (pnl < 0) {
        lossCount++;
        totalLossAmount += Math.abs(pnl);
      }
      totalMindsetScore += (t.mindsetScore || 75);
    });

    const winRate = totalTrades > 0 ? ((winCount / totalTrades) * 100).toFixed(1) : 0;
    const avgWin = winCount > 0 ? totalWinAmount / winCount : 0;
    const avgLoss = lossCount > 0 ? totalLossAmount / lossCount : 1;
    const avgRR = (avgWin / (avgLoss || 1)).toFixed(2);
    const avgMindset = totalTrades > 0 ? Math.round(totalMindsetScore / totalTrades) : 100;

    return {
      totalTrades,
      totalPnL,
      winRate,
      avgRR,
      highestProfit,
      winCount,
      lossCount,
      avgMindset
    };
  }, [trades]);

  const cumulativeData = useMemo(() => {
    let current = 0;
    return trades.map((t, idx) => {
      current += Number(t.pnl) || 0;
      return {
        id: t.id,
        date: t.date,
        symbol: t.symbol,
        pnl: current,
        tradePnL: t.pnl
      };
    });
  }, [trades]);

  const strategyBreakdown = useMemo(() => {
    const map = {};
    trades.forEach((t) => {
      const strat = t.strategy || 'Other';
      if (!map[strat]) map[strat] = { count: 0, pnl: 0 };
      map[strat].count++;
      map[strat].pnl += Number(t.pnl) || 0;
    });
    return Object.entries(map).map(([key, val]) => ({ strategy: key, ...val }));
  }, [trades]);

  const commonMistakes = useMemo(() => {
    const counts = {
      FOMO: 0,
      Emotional: 0,
      Overconfident: 0,
      Impatient: 0,
      'No HTF Align': 0,
      'Timepass Trade': 0
    };

    trades.forEach((t) => {
      if (t.psychology) {
        if (t.psychology.fomo) counts['FOMO']++;
        if (t.psychology.emotional) counts['Emotional']++;
        if (t.psychology.overconfident) counts['Overconfident']++;
        if (t.psychology.impatient) counts['Impatient']++;
        if (!t.psychology.htfAlignment) counts['No HTF Align']++;
        if (t.psychology.timepass) counts['Timepass Trade']++;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, cnt]) => cnt > 0);
  }, [trades]);

  const handleSaveTrade = (e) => {
    e.preventDefault();
    const entry = Number(formData.entryPrice) || 0;
    const exit = Number(formData.exitPrice) || 0;
    const qty = Number(formData.quantity) || 1;
    let calculatedPnL = 0;

    if (formData.direction === 'LONG') {
      calculatedPnL = (exit - entry) * qty;
    } else {
      calculatedPnL = (entry - exit) * qty;
    }

    if (['CTC', 'Missed Target', 'Avoided SL', 'Avoided Target'].includes(formData.outcome)) {
      calculatedPnL = 0;
    }

    const newTrade = {
      id: 'tr-' + Date.now(),
      date: formData.date,
      time: formData.time,
      symbol: formData.symbol.toUpperCase(),
      direction: formData.direction,
      entry,
      exit,
      quantity: qty,
      risk: Number(formData.riskAmount),
      pnl: calculatedPnL,
      rr: `1:${(Number(formData.targetAmount) / Number(formData.riskAmount || 1)).toFixed(1)}`,
      strategy: formData.strategy,
      executionType: formData.executionType,
      outcome: formData.outcome,
      mindsetScore: currentMindsetScore,
      psychology: { ...formData }
    };

    setTrades([newTrade, ...trades]);
    setIsModalOpen(false);
    setFormData(defaultFormData);
  };

  const handleDeleteTrade = (id) => {
    if (window.confirm('Are you sure you want to delete this trade entry?')) {
      setTrades(trades.filter((t) => t.id !== id));
    }
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trades, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TradeDiary_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            setTrades(parsed);
            alert('Trades imported successfully!');
          }
        } catch (err) {
          alert('Invalid JSON file format');
        }
      };
    }
  };

  const filteredTrades = useMemo(() => {
    if (filterType === 'WINS') return trades.filter((t) => t.pnl > 0);
    if (filterType === 'LOSSES') return trades.filter((t) => t.pnl < 0);
    if (filterType === 'MISSED') return trades.filter((t) => ['Missed Target', 'Avoided SL', 'Avoided Target'].includes(t.outcome));
    return trades;
  }, [trades, filterType]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-900">
      
      {}
      <header className="h-16 bg-[#1e293b]/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
            K
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                TradeDiary
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-1 font-mono">kaizenenter.com</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-emerald-500/25 text-sm"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>+ New Trade</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {}
        <aside className="w-64 bg-[#1e293b]/50 border-r border-slate-800 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 font-mono">
                Main Menu
              </p>
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'trades', label: 'Trade Log', icon: BarChart3 },
                  { id: 'strategies', label: 'Strategies', icon: TrendingUp },
                  { id: 'mistakes', label: 'Mistakes Tracker', icon: ShieldAlert },
                  { id: 'checklist', label: 'Pre-Trade Checklist', icon: CheckSquare },
                  { id: 'rules', label: 'Trading Rules', icon: BookOpen }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Persistence & Data Sync Block */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 font-mono">
                Data Management
              </p>
              <div className="space-y-2 px-1">
                <button
                  onClick={handleExportData}
                  className="w-full flex items-center justify-between text-xs text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-3 py-2 rounded-md border border-slate-700/50 transition"
                >
                  <span className="flex items-center space-x-2">
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Export Trades</span>
                  </span>
                </button>

                <label className="w-full flex items-center justify-between text-xs text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-3 py-2 rounded-md border border-slate-700/50 transition cursor-pointer">
                  <span className="flex items-center space-x-2">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Import Data</span>
                  </span>
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>

                <button
                  onClick={() => {
                    if (confirm('Reset to original sample data?')) {
                      setTrades(SAMPLE_TRADES);
                    }
                  }}
                  className="w-full flex items-center space-x-2 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Sample Data</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Brain className="w-4 h-4 text-emerald-400" />
              <span>Psychology Index</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-lg font-bold text-slate-100">{metrics.avgMindset}%</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Optimal</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${metrics.avgMindset}%` }}
              ></div>
            </div>
          </div>
        </aside>

        {}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* Dashboard View */}
          {activeTab === 'dashboard' && (
            <>
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total P&L */}
                <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <span>Total P&L</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className={`text-2xl font-black ${metrics.totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {metrics.totalPnL >= 0 ? `+₹${metrics.totalPnL.toLocaleString()}` : `-₹${Math.abs(metrics.totalPnL).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center space-x-1">
                    {metrics.totalPnL >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-rose-400" />
                    )}
                    <span>Net realized returns</span>
                  </div>
                </div>

                {/* Win Rate */}
                <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <span>Win Rate</span>
                    <Percent className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-100">{metrics.winRate}%</span>
                    <span className="text-xs text-slate-400">{metrics.winCount}W / {metrics.lossCount}L</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Accuracy ratio across trades
                  </div>
                </div>

                {/* Avg Risk/Reward */}
                <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <span>Avg Risk / Reward</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-100">1 : {metrics.avgRR}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Expected payoff ratio
                  </div>
                </div>

                {/* Total Trades Count */}
                <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <span>Total Trades</span>
                    <Hash className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-slate-100">{metrics.totalTrades}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Log sample count
                  </div>
                </div>

                {/* Highest Profit */}
                <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
                    <span>Highest Win</span>
                    <Award className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-400">
                      +₹{metrics.highestProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Best trade payout
                  </div>
                </div>
              </div>

              {}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Cumulative Equity Curve Chart (Interactive SVG Area) */}
                <div className="lg:col-span-2 bg-[#1e293b] p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide font-mono">
                          Cumulative Equity Curve
                        </h3>
                        <p className="text-xs text-slate-400">Real-time P&L trajectory based on trade history</p>
                      </div>

                      <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
                        {['DAY', 'WEEK', 'MONTH'].map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-2.5 py-1 rounded font-mono transition ${
                              timeframe === tf
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SVG Curve Graphics */}
                    <div className="h-60 w-full relative pt-4">
                      {cumulativeData.length > 0 ? (
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Zero Line */}
                          <line x1="0" y1="150" x2="500" y2="150" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />

                          {/* Dynamic Path Mapping */}
                          {(() => {
                            const maxVal = Math.max(...cumulativeData.map((d) => d.pnl), 10000);
                            const minVal = Math.min(...cumulativeData.map((d) => d.pnl), -5000);
                            const range = maxVal - minVal || 1;

                            const points = cumulativeData.map((d, i) => {
                              const x = (i / (cumulativeData.length - 1 || 1)) * 500;
                              const y = 180 - ((d.pnl - minVal) / range) * 160;
                              return { x, y, ...d };
                            });

                            const dPath = points.reduce((acc, pt, idx) => {
                              return `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
                            }, '');

                            const areaPath = `${dPath} L 500 200 L 0 200 Z`;

                            return (
                              <>
                                <path d={areaPath} fill="url(#pnlGradient)" />
                                <path d={dPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

                                {points.map((pt, idx) => (
                                  <g key={idx} className="group cursor-pointer">
                                    <circle
                                      cx={pt.x}
                                      cy={pt.y}
                                      r="5"
                                      className="fill-emerald-400 stroke-slate-900 stroke-2 group-hover:r-7 transition-all"
                                    />
                                  </g>
                                ))}
                              </>
                            );
                          })()}
                        </svg>
                      ) : (
                        <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                          No trades available for charting
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800 font-mono">
                    <span>Start: ₹0</span>
                    <span>Current: ₹{metrics.totalPnL.toLocaleString()}</span>
                  </div>
                </div>

                {/* Strategy vs P&L Performance Breakdown */}
                <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide font-mono mb-1">
                      Strategy Performance
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">P&L distribution per setup type</p>

                    <div className="space-y-3">
                      {strategyBreakdown.map((item) => (
                        <div key={item.strategy} className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-300">{item.strategy}</span>
                            <span className={item.pnl >= 0 ? 'text-emerald-400 font-mono font-bold' : 'text-rose-400 font-mono font-bold'}>
                              {item.pnl >= 0 ? `+₹${item.pnl}` : `-₹${Math.abs(item.pnl)}`}
                            </span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.pnl >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                              style={{
                                width: `${Math.min(100, Math.max(15, (Math.abs(item.pnl) / (metrics.highestProfit || 1)) * 100))}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
                    <span>Top Strategy</span>
                    <span className="text-emerald-400 font-semibold">Breakout + Volume</span>
                  </div>
                </div>
              </div>

              {/* Trade History Section */}
              <div className="bg-[#1e293b] rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide font-mono">
                      Trade History & Execution Log
                    </h3>
                    <p className="text-xs text-slate-400">Detailed records with mindset score evaluation</p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
                    <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
                    {['ALL', 'WINS', 'LOSSES', 'MISSED'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-2.5 py-1 rounded font-mono transition ${
                          filterType === type
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/60 font-mono text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Date / Time</th>
                        <th className="py-3 px-4">Symbol</th>
                        <th className="py-3 px-4">Side</th>
                        <th className="py-3 px-4">Entry / Exit</th>
                        <th className="py-3 px-4">P&L (₹)</th>
                        <th className="py-3 px-4">R:R</th>
                        <th className="py-3 px-4">Strategy</th>
                        <th className="py-3 px-4">Mindset</th>
                        <th className="py-3 px-4">Outcome</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {filteredTrades.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-800/30 transition">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="text-slate-200 font-semibold">{t.date}</div>
                            <div className="text-[10px] text-slate-500">{t.time}</div>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-100">{t.symbol}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                t.direction === 'LONG'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {t.direction}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div>En: ₹{t.entry}</div>
                            <div className="text-slate-400 text-[10px]">Ex: ₹{t.exit}</div>
                          </td>
                          <td className="py-3 px-4 font-bold whitespace-nowrap">
                            <span className={t.pnl > 0 ? 'text-emerald-400' : t.pnl < 0 ? 'text-rose-400' : 'text-slate-400'}>
                              {t.pnl > 0 ? `+₹${t.pnl.toLocaleString()}` : t.pnl < 0 ? `-₹${Math.abs(t.pnl).toLocaleString()}` : '₹0'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{t.rr}</td>
                          <td className="py-3 px-4 text-slate-300 font-sans">{t.strategy}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1.5">
                              <span
                                className={`font-bold ${
                                  t.mindsetScore >= 80
                                    ? 'text-emerald-400'
                                    : t.mindsetScore >= 60
                                    ? 'text-amber-400'
                                    : 'text-rose-400'
                                }`}
                              >
                                {t.mindsetScore}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                              {t.outcome}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteTrade(t.id)}
                              className="text-slate-500 hover:text-rose-400 transition p-1"
                              title="Delete Trade"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Trade Log Tab Direct View */}
          {activeTab === 'trades' && (
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800">
              <h2 className="text-xl font-bold mb-4 font-mono text-emerald-400">Trade History Log</h2>
              <p className="text-sm text-slate-400 mb-6">Displaying all executed, missed, and avoided trade logs synced locally.</p>
              
              <div className="space-y-4">
                {trades.map((t) => (
                  <div key={t.id} className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${t.pnl >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {t.direction === 'LONG' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-base text-slate-100">{t.symbol}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{t.direction}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{t.date} at {t.time} • Strategy: {t.strategy}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 font-mono text-sm">
                      <div>
                        <div className="text-xs text-slate-500">P&L</div>
                        <div className={`font-extrabold ${t.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {t.pnl >= 0 ? `+₹${t.pnl}` : `-₹${Math.abs(t.pnl)}`}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Mindset</div>
                        <div className="font-bold text-slate-200">{t.mindsetScore}%</div>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDeleteTrade(t.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategy View Tab */}
          {activeTab === 'strategies' && (
            <div className="space-y-6">
              <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800">
                <h2 className="text-xl font-bold font-mono text-emerald-400 mb-2">Playbook Strategy Engine</h2>
                <p className="text-sm text-slate-400">Backtested setup configurations and profitability weights.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Breakout + Volume', winRate: '68%', avgRR: '1:2.8', desc: 'High momentum surge with institutional order flow expansion.' },
                  { name: 'EMA Pullback', winRate: '62%', avgRR: '1:2.2', desc: 'Trend continuation entry on 20-period exponential average touch.' },
                  { name: 'VWAP Rejection', winRate: '54%', avgRR: '1:1.8', desc: 'Intraday mean reversion setup near session volume anchor.' }
                ].map((s) => (
                  <div key={s.name} className="bg-[#1e293b] p-5 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="font-bold text-slate-100 text-base">{s.name}</h3>
                    <p className="text-xs text-slate-400">{s.desc}</p>
                    <div className="flex justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                      <span>Win Rate: <strong className="text-emerald-400">{s.winRate}</strong></span>
                      <span>Avg RR: <strong className="text-blue-400">{s.avgRR}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mistakes Tracker Tab */}
          {activeTab === 'mistakes' && (
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-bold font-mono text-rose-400 mb-1">Mistakes & Friction Tracker</h2>
                <p className="text-sm text-slate-400">Identify subconscious trading leakages from pre-trade psychology logs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {commonMistakes.map(([mistake, count]) => (
                  <div key={mistake} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 text-sm">{mistake}</div>
                        <div className="text-xs text-slate-400">Logged {count} times</div>
                      </div>
                    </div>
                    <span className="text-lg font-black text-rose-400 font-mono">#{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist & Rules Views */}
          {(activeTab === 'checklist' || activeTab === 'rules') && (
            <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold font-mono text-emerald-400">
                {activeTab === 'checklist' ? 'Pre-Trade Execution Checklist' : 'Core Disciplined Rules'}
              </h2>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Never take a trade without defined Stop Loss and Target before order submission.</span>
                </li>
                <li className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Max daily loss limit is capped at 3% of trading equity account.</span>
                </li>
                <li className="flex items-start space-x-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Do not take Class C setups unless Mindset Score is above 85%.</span>
                </li>
              </ul>
            </div>
          )}
        </main>
      </div>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#1e293b] border border-slate-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base font-mono">
                  + New Trade Entry & Psychology Engine
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTrade} className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Section 1: Trade Specification */}
              <div>
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  1. Trade Execution Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Symbol</label>
                    <input
                      type="text"
                      placeholder="e.g. BANKNIFTY"
                      value={formData.symbol}
                      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 uppercase focus:outline-none focus:border-emerald-500 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Direction</label>
                    <select
                      value={formData.direction}
                      onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    >
                      <option value="LONG">LONG</option>
                      <option value="SHORT">SHORT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Entry Price (₹)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.entryPrice}
                      onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Exit Price (₹)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.exitPrice}
                      onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Quantity</label>
                    <input
                      type="number"
                      placeholder="15"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Risk Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.riskAmount}
                      onChange={(e) => setFormData({ ...formData, riskAmount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Target Amount (₹)</label>
                    <input
                      type="number"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Strategy</label>
                    <select
                      value={formData.strategy}
                      onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Breakout + Volume">Breakout + Volume</option>
                      <option value="EMA Pullback">EMA Pullback</option>
                      <option value="VWAP Rejection">VWAP Rejection</option>
                      <option value="Support Rejection">Support Rejection</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Execution Type</label>
                    <select
                      value={formData.executionType}
                      onChange={(e) => setFormData({ ...formData, executionType: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Market">Market Order</option>
                      <option value="Limit">Limit Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Outcome Result Category</label>
                    <select
                      value={formData.outcome}
                      onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                    >
                      <option value="Target">Target</option>
                      <option value="Trail Target">Trail Target</option>
                      <option value="CTC">CTC (Cost to Cost)</option>
                      <option value="SL">SL (Stop Loss)</option>
                      <option value="Missed Target">Missed Target</option>
                      <option value="Missed SL">Missed SL</option>
                      <option value="Avoided Target">Avoided Target</option>
                      <option value="Avoided SL">Avoided SL</option>
                    </select>
                  </div>
                </div>
              </div>

              {}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  2. 12-Parameter Mindset & Psychology Checklist
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs">
                  
                  {/* Toggles */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.overconfident}
                      onChange={(e) => setFormData({ ...formData, overconfident: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Feeling Overconfident?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.emotional}
                      onChange={(e) => setFormData({ ...formData, emotional: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Emotional State Active?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.htfAlignment}
                      onChange={(e) => setFormData({ ...formData, htfAlignment: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>HTF Direction Aligned?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.onPC}
                      onChange={(e) => setFormData({ ...formData, onPC: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Trading on Workstation PC?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.backtested}
                      onChange={(e) => setFormData({ ...formData, backtested: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Setup Fully Backtested?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.slTargetClear}
                      onChange={(e) => setFormData({ ...formData, slTargetClear: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Target & SL Defined?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.fomo}
                      onChange={(e) => setFormData({ ...formData, fomo: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>FOMO Driven?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.impatient}
                      onChange={(e) => setFormData({ ...formData, impatient: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Impatient Entry?</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.timepass}
                      onChange={(e) => setFormData({ ...formData, timepass: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Timepass / Boredom Trade?</span>
                  </label>

                  {/* Dropdowns */}
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Setup Quality Class</label>
                    <select
                      value={formData.setupClass}
                      onChange={(e) => setFormData({ ...formData, setupClass: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                    >
                      <option value="Class A">Class A (Prime Setup)</option>
                      <option value="Class B">Class B (Average)</option>
                      <option value="Class C">Class C (Low Prob)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Confidence Level</label>
                    <select
                      value={formData.confidence}
                      onChange={(e) => setFormData({ ...formData, confidence: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                    >
                      <option value="High">High Confidence</option>
                      <option value="Med">Medium Confidence</option>
                      <option value="Low">Low Confidence</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-0.5">Trade Sequence Count</label>
                    <select
                      value={formData.sequence}
                      onChange={(e) => setFormData({ ...formData, sequence: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                    >
                      <option value="1st Trade">1st Trade of Day</option>
                      <option value="2nd Trade">2nd Trade of Day</option>
                      <option value="3rd+ Trade">3rd+ Trade (Overtrading risk)</option>
                    </select>
                  </div>
                </div>
              </div>

              {}
              <div className="p-4 rounded-xl border bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Calculated Pre-Trade Score</div>
                  <div className="text-2xl font-black text-slate-100 font-mono">{currentMindsetScore}%</div>
                </div>

                <div className={`px-4 py-2 rounded-lg border text-xs font-mono font-bold ${systemDecision.color}`}>
                  SYSTEM EVALUATION: {systemDecision.label}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-lg shadow-emerald-500/20"
                >
                  Save Trade Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
