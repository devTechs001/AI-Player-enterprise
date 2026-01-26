import api from './api.service';

class StatusService {
  // Get system status
  async getSystemStatus() {
    const response = await api.get('/status/system');
    return response.data;
  }

  // Get service status
  async getServiceStatus() {
    const response = await api.get('/status/services');
    return response.data;
  }

  // Get incidents
  async getIncidents(options = {}) {
    const response = await api.get('/status/incidents', { params: options });
    return response.data;
  }

  // Get incident details
  async getIncident(incidentId) {
    const response = await api.get(`/status/incidents/${incidentId}`);
    return response.data;
  }

  // Get roadmap
  async getRoadmap() {
    const response = await api.get('/status/roadmap');
    return response.data;
  }

  // Get changelog
  async getChangelog(options = {}) {
    const response = await api.get('/status/changelog', { params: options });
    return response.data;
  }

  // Get release notes
  async getReleaseNotes(options = {}) {
    const response = await api.get('/status/releases', { params: options });
    return response.data;
  }

  // Get system metrics
  async getSystemMetrics() {
    const response = await api.get('/status/metrics');
    return response.data;
  }

  // Get uptime history
  async getUptimeHistory(period = '90d') {
    const response = await api.get('/status/uptime', { params: { period } });
    return response.data;
  }

  // Get performance metrics
  async getPerformanceMetrics() {
    const response = await api.get('/status/performance');
    return response.data;
  }

  // Get API status
  async getApiStatus() {
    const response = await api.get('/status/api');
    return response.data;
  }

  // Get database status
  async getDatabaseStatus() {
    const response = await api.get('/status/database');
    return response.data;
  }

  // Get CDN status
  async getCdnStatus() {
    const response = await api.get('/status/cdn');
    return response.data;
  }

  // Get third-party services status
  async getThirdPartyStatus() {
    const response = await api.get('/status/third-party');
    return response.data;
  }

  // Get historical status
  async getHistoricalStatus(options = {}) {
    const response = await api.get('/status/historical', { params: options });
    return response.data;
  }

  // Get status summary
  async getStatusSummary() {
    const response = await api.get('/status/summary');
    return response.data;
  }

  // Subscribe to status updates
  async subscribeToStatus(email) {
    const response = await api.post('/status/subscribe', { email });
    return response.data;
  }

  // Unsubscribe from status updates
  async unsubscribeFromStatus(email) {
    const response = await api.post('/status/unsubscribe', { email });
    return response.data;
  }

  // Get status page configuration
  async getStatusPageConfig() {
    const response = await api.get('/status/config');
    return response.data;
  }

  // Get maintenance windows
  async getMaintenanceWindows() {
    const response = await api.get('/status/maintenance');
    return response.data;
  }

  // Get scheduled maintenance
  async getScheduledMaintenance() {
    const response = await api.get('/status/maintenance/scheduled');
    return response.data;
  }

  // Get active maintenance
  async getActiveMaintenance() {
    const response = await api.get('/status/maintenance/active');
    return response.data;
  }

  // Get status by region
  async getStatusByRegion(region) {
    const response = await api.get(`/status/regions/${region}`);
    return response.data;
  }

  // Get status by service
  async getStatusByService(service) {
    const response = await api.get(`/status/services/${service}`);
    return response.data;
  }

  // Get status history for specific service
  async getServiceHistory(service, options = {}) {
    const response = await api.get(`/status/services/${service}/history`, { params: options });
    return response.data;
  }

  // Get status alerts
  async getStatusAlerts() {
    const response = await api.get('/status/alerts');
    return response.data;
  }

  // Get status notifications
  async getStatusNotifications() {
    const response = await api.get('/status/notifications');
    return response.data;
  }

  // Get status metrics for dashboard
  async getDashboardMetrics() {
    const response = await api.get('/status/dashboard');
    return response.data;
  }

  // Get status for embed
  async getEmbedStatus() {
    const response = await api.get('/status/embed');
    return response.data;
  }

  // Get status as RSS
  async getStatusRss() {
    const response = await api.get('/status/rss');
    return response.data;
  }

  // Get status as JSON
  async getStatusJson() {
    const response = await api.get('/status/json');
    return response.data;
  }

  // Get status as Atom
  async getStatusAtom() {
    const response = await api.get('/status/atom');
    return response.data;
  }

  // Get status uptime for specific period
  async getUptimeForPeriod(service, period) {
    const response = await api.get(`/status/uptime/${service}/${period}`);
    return response.data;
  }

  // Get status trends
  async getStatusTrends() {
    const response = await api.get('/status/trends');
    return response.data;
  }

  // Get status comparison
  async getStatusComparison(services, period) {
    const response = await api.get('/status/comparison', {
      params: { services: services.join(','), period }
    });
    return response.data;
  }

  // Get status SLA
  async getSlaStatus() {
    const response = await api.get('/status/sla');
    return response.data;
  }

  // Get status compliance
  async getComplianceStatus() {
    const response = await api.get('/status/compliance');
    return response.data;
  }

  // Get status certifications
  async getCertifications() {
    const response = await api.get('/status/certifications');
    return response.data;
  }

  // Get status security
  async getSecurityStatus() {
    const response = await api.get('/status/security');
    return response.data;
  }

  // Get status privacy
  async getPrivacyStatus() {
    const response = await api.get('/status/privacy');
    return response.data;
  }

  // Get status accessibility
  async getAccessibilityStatus() {
    const response = await api.get('/status/accessibility');
    return response.data;
  }

  // Get status performance benchmarks
  async getPerformanceBenchmarks() {
    const response = await api.get('/status/performance/benchmarks');
    return response.data;
  }

  // Get status latency
  async getLatencyStatus() {
    const response = await api.get('/status/latency');
    return response.data;
  }

  // Get status packet loss
  async getPacketLossStatus() {
    const response = await api.get('/status/packet-loss');
    return response.data;
  }

  // Get status jitter
  async getJitterStatus() {
    const response = await api.get('/status/jitter');
    return response.data;
  }

  // Get status availability
  async getAvailabilityStatus() {
    const response = await api.get('/status/availability');
    return response.data;
  }

  // Get status reliability
  async getReliabilityStatus() {
    const response = await api.get('/status/reliability');
    return response.data;
  }

  // Get status scalability
  async getScalabilityStatus() {
    const response = await api.get('/status/scalability');
    return response.data;
  }

  // Get status capacity
  async getCapacityStatus() {
    const response = await api.get('/status/capacity');
    return response.data;
  }

  // Get status load
  async getLoadStatus() {
    const response = await api.get('/status/load');
    return response.data;
  }

  // Get status traffic
  async getTrafficStatus() {
    const response = await api.get('/status/traffic');
    return response.data;
  }

  // Get status bandwidth
  async getBandwidthStatus() {
    const response = await api.get('/status/bandwidth');
    return response.data;
  }

  // Get status throughput
  async getThroughputStatus() {
    const response = await api.get('/status/throughput');
    return response.data;
  }

  // Get status response time
  async getResponseTimeStatus() {
    const response = await api.get('/status/response-time');
    return response.data;
  }

  // Get status error rate
  async getErrorRateStatus() {
    const response = await api.get('/status/error-rate');
    return response.data;
  }

  // Get status success rate
  async getSuccessRateStatus() {
    const response = await api.get('/status/success-rate');
    return response.data;
  }

  // Get status availability percentage
  async getAvailabilityPercentage() {
    const response = await api.get('/status/availability-percentage');
    return response.data;
  }

  // Get status downtime
  async getDowntimeStatus() {
    const response = await api.get('/status/downtime');
    return response.data;
  }

  // Get status incidents by severity
  async getIncidentsBySeverity(severity) {
    const response = await api.get(`/status/incidents/severity/${severity}`);
    return response.data;
  }

  // Get status incidents by type
  async getIncidentsByType(type) {
    const response = await api.get(`/status/incidents/type/${type}`);
    return response.data;
  }

  // Get status incidents by category
  async getIncidentsByCategory(category) {
    const response = await api.get(`/status/incidents/category/${category}`);
    return response.data;
  }

  // Get status incidents by status
  async getIncidentsByStatus(status) {
    const response = await api.get(`/status/incidents/status/${status}`);
    return response.data;
  }

  // Get status incidents by date range
  async getIncidentsByDateRange(startDate, endDate) {
    const response = await api.get('/status/incidents/date-range', {
      params: { startDate, endDate }
    });
    return response.data;
  }

  // Get status incidents by service
  async getIncidentsByService(service) {
    const response = await api.get(`/status/incidents/service/${service}`);
    return response.data;
  }

  // Get status incidents by region
  async getIncidentsByRegion(region) {
    const response = await api.get(`/status/incidents/region/${region}`);
    return response.data;
  }

  // Get status incidents by priority
  async getIncidentsByPriority(priority) {
    const response = await api.get(`/status/incidents/priority/${priority}`);
    return response.data;
  }

  // Get status incidents by impact
  async getIncidentsByImpact(impact) {
    const response = await api.get(`/status/incidents/impact/${impact}`);
    return response.data;
  }

  // Get status incidents by resolution time
  async getIncidentsByResolutionTime(timeframe) {
    const response = await api.get(`/status/incidents/resolution-time/${timeframe}`);
    return response.data;
  }

  // Get status incidents by root cause
  async getIncidentsByRootCause(cause) {
    const response = await api.get(`/status/incidents/root-cause/${cause}`);
    return response.data;
  }

  // Get status incidents by affected users
  async getIncidentsByAffectedUsers(count) {
    const response = await api.get(`/status/incidents/affected-users/${count}`);
    return response.data;
  }

  // Get status incidents by duration
  async getIncidentsByDuration(duration) {
    const response = await api.get(`/status/incidents/duration/${duration}`);
    return response.data;
  }

  // Get status incidents by recurrence
  async getIncidentsByRecurrence(recurrence) {
    const response = await api.get(`/status/incidents/recurrence/${recurrence}`);
    return response.data;
  }

  // Get status incidents by escalation level
  async getIncidentsByEscalationLevel(level) {
    const response = await api.get(`/status/incidents/escalation/${level}`);
    return response.data;
  }

  // Get status incidents by resolution status
  async getIncidentsByResolutionStatus(status) {
    const response = await api.get(`/status/incidents/resolution-status/${status}`);
    return response.data;
  }

  // Get status incidents by communication status
  async getIncidentsByCommunicationStatus(status) {
    const response = await api.get(`/status/incidents/communication-status/${status}`);
    return response.data;
  }

  // Get status incidents by postmortem status
  async getIncidentsByPostmortemStatus(status) {
    const response = await api.get(`/status/incidents/postmortem-status/${status}`);
    return response.data;
  }

  // Get status incidents by blame
  async getIncidentsByBlame(blame) {
    const response = await api.get(`/status/incidents/blame/${blame}`);
    return response.data;
  }

  // Get status incidents by learning
  async getIncidentsByLearning(learning) {
    const response = await api.get(`/status/incidents/learning/${learning}`);
    return response.data;
  }

  // Get status incidents by prevention
  async getIncidentsByPrevention(prevention) {
    const response = await api.get(`/status/incidents/prevention/${prevention}`);
    return response.data;
  }

  // Get status incidents by mitigation
  async getIncidentsByMitigation(mitigation) {
    const response = await api.get(`/status/incidents/mitigation/${mitigation}`);
    return response.data;
  }

  // Get status incidents by impact assessment
  async getIncidentsByImpactAssessment(assessment) {
    const response = await api.get(`/status/incidents/impact-assessment/${assessment}`);
    return response.data;
  }

  // Get status incidents by risk level
  async getIncidentsByRiskLevel(level) {
    const response = await api.get(`/status/incidents/risk-level/${level}`);
    return response.data;
  }

  // Get status incidents by business impact
  async getIncidentsByBusinessImpact(impact) {
    const response = await api.get(`/status/incidents/business-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by customer impact
  async getIncidentsByCustomerImpact(impact) {
    const response = await api.get(`/status/incidents/customer-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by revenue impact
  async getIncidentsByRevenueImpact(impact) {
    const response = await api.get(`/status/incidents/revenue-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by reputation impact
  async getIncidentsByReputationImpact(impact) {
    const response = await api.get(`/status/incidents/reputation-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by regulatory impact
  async getIncidentsByRegulatoryImpact(impact) {
    const response = await api.get(`/status/incidents/regulatory-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by legal impact
  async getIncidentsByLegalImpact(impact) {
    const response = await api.get(`/status/incidents/legal-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by compliance impact
  async getIncidentsByComplianceImpact(impact) {
    const response = await api.get(`/status/incidents/compliance-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by security impact
  async getIncidentsBySecurityImpact(impact) {
    const response = await api.get(`/status/incidents/security-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by privacy impact
  async getIncidentsByPrivacyImpact(impact) {
    const response = await api.get(`/status/incidents/privacy-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by accessibility impact
  async getIncidentsByAccessibilityImpact(impact) {
    const response = await api.get(`/status/incidents/accessibility-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by performance impact
  async getIncidentsByPerformanceImpact(impact) {
    const response = await api.get(`/status/incidents/performance-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by scalability impact
  async getIncidentsByScalabilityImpact(impact) {
    const response = await api.get(`/status/incidents/scalability-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by reliability impact
  async getIncidentsByReliabilityImpact(impact) {
    const response = await api.get(`/status/incidents/reliability-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by availability impact
  async getIncidentsByAvailabilityImpact(impact) {
    const response = await api.get(`/status/incidents/availability-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by capacity impact
  async getIncidentsByCapacityImpact(impact) {
    const response = await api.get(`/status/incidents/capacity-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by load impact
  async getIncidentsByLoadImpact(impact) {
    const response = await api.get(`/status/incidents/load-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by traffic impact
  async getIncidentsByTrafficImpact(impact) {
    const response = await api.get(`/status/incidents/traffic-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by bandwidth impact
  async getIncidentsByBandwidthImpact(impact) {
    const response = await api.get(`/status/incidents/bandwidth-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by throughput impact
  async getIncidentsByThroughputImpact(impact) {
    const response = await api.get(`/status/incidents/throughput-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by response time impact
  async getIncidentsByResponseTimeImpact(impact) {
    const response = await api.get(`/status/incidents/response-time-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by error rate impact
  async getIncidentsByErrorRateImpact(impact) {
    const response = await api.get(`/status/incidents/error-rate-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by success rate impact
  async getIncidentsBySuccessRateImpact(impact) {
    const response = await api.get(`/status/incidents/success-rate-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by availability percentage impact
  async getIncidentsByAvailabilityPercentageImpact(impact) {
    const response = await api.get(`/status/incidents/availability-percentage-impact/${impact}`);
    return response.data;
  }

  // Get status incidents by downtime impact
  async getIncidentsByDowntimeImpact(impact) {
    const response = await api.get(`/status/incidents/downtime-impact/${impact}`);
    return response.data;
  }
}

export const statusService = new StatusService();
export default statusService;