// SHARED DATABASE & FINANCIAL ENGINE
const Storage = {
  getTolerance: () => parseFloat(localStorage.getItem('sl_tolerance')) || 10,
  setTolerance: (val) => localStorage.setItem('sl_tolerance', val),

  getTrueBalance: () => parseFloat(localStorage.getItem('sl_true_balance')) || 2000.00,
  setTrueBalance: (val) => localStorage.setItem('sl_true_balance', val),

  getRequests: () => {
    const data = localStorage.getItem('sl_requests');
    if (!data) {
      const initial = [
        { id: '1', title: 'Welcome Week Pizza', user: 'VolOfficer', estimate: 150.00, reimbursement: 0, status: 'approved', date: '2026-10-01' },
        { id: '2', title: 'Banner Printing', user: 'VolOfficer', estimate: 80.00, reimbursement: 0, status: 'pending', date: '2026-10-10' }
      ];
      localStorage.setItem('sl_requests', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },
  saveRequests: (data) => localStorage.setItem('sl_requests', JSON.stringify(data)),

  getLedger: () => {
    const data = localStorage.getItem('sl_ledger');
    if (!data) {
      const initial = [
        { id: '101', date: '2026-09-01', desc: 'Initial Semester Funding', user: 'Treasurer', amount: 2000.00 }
      ];
      localStorage.setItem('sl_ledger', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },
  saveLedger: (data) => localStorage.setItem('sl_ledger', JSON.stringify(data))
};

function calculateCommittedFunds() {
  const reqs = Storage.getRequests();
  return reqs
    .filter(r => r.status === 'approved' || r.status === 'awaiting')
    .reduce((sum, r) => sum + r.estimate, 0);
}

function calculateAvailableBalance() {
  return Storage.getTrueBalance() - calculateCommittedFunds();
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}
