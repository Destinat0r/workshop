package ua.org.training.workshop.dao;

import ua.org.training.workshop.dao.impl.JDBCDaoFactory;

public abstract class DaoFactory {
    private static DaoFactory daoFactory;

    public static DaoFactory getInstance() {
        if (daoFactory == null) {
            synchronized (DaoFactory.class) {
                if (daoFactory == null) {
                    DaoFactory temp = new JDBCDaoFactory();
                    daoFactory = temp;
                }
            }
        }
        return daoFactory;
    }

    public abstract AccountDao createAccountDao();

    public abstract RoleDao createRoleDao();

    public abstract StatusDao createStatusDao();

    public abstract RequestDao createRequestDao();

    public abstract HistoryRequestDao createHistoryRequestDao();
}

