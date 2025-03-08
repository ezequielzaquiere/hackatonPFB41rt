//Importamos los componentes
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

//Importamos las páginas
import HomePage from './pages/HomePage';
import NewHackathonPage from './pages/NewHackathonPage';
import NotFound from './pages/NotFound';
import DetailHackathonPage from './pages/DetailHackathonPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ValidateUserPage from './pages/ValidateUserPage';
import PrivateUserProfilePage from './pages/PrivateUserProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import EditHackathonPage from './pages/EditHackathonInfoPage';
import SendRecoveryPassCode from './pages/SendRecoveryPassCode';
import UseRecoveryPassCode from './pages/UseRecoveryPassCode';
import UserProfilePage from './pages/UserProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import VerificationRegisterHackathon from './pages/VerificationRegisterHackathon';
import UserHackathons from './pages/SeeUserHackathons';
import ChooseTop3 from './pages/ChooseTop3';
import AdminHackathons from './pages/SeeAdminHackathons';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionPage from './pages/TermsAndConditionsPage';
//Definimos el componente principal
const App = () => {
    return (
        <>
            <Header />

            {/* Aquí va el Toaster */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />

            {/* Aquí irán los endpoints dentro del componente Routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/users/validate/:regCode"
                    element={<ValidateUserPage />}
                />
                <Route
                    path="/hackathon/validate/:hackathonId/:confirmationCode"
                    element={<VerificationRegisterHackathon />}
                />

                <Route
                    path="/users/profile"
                    element={<PrivateUserProfilePage />}
                />
                <Route
                    path="/users/profile/update"
                    element={<UpdateProfilePage />}
                />
                <Route
                    path="/users/password/reset"
                    element={<SendRecoveryPassCode />}
                />
                <Route
                    path="/users/:userId/password/:recoverPassCode"
                    element={<UseRecoveryPassCode />}
                />
                <Route
                    path="/users/password/change"
                    element={<ChangePasswordPage />}
                />

                <Route
                    path="/users/profile/public"
                    element={<UserProfilePage />}
                />
                <Route path="/hackathon/new" element={<NewHackathonPage />} />
                <Route
                    path="/details/:hackathonId"
                    element={<DetailHackathonPage />}
                />
                <Route
                    path="/details/:hackathonId/edit"
                    element={<EditHackathonPage />}
                />
                <Route
                    path="/:username/registrations"
                    element={<UserHackathons />}
                />
                <Route
                    path="/:username/myhackathons"
                    element={<AdminHackathons />}
                />

                <Route
                    path="/:hackathonId/ranking/set"
                    element={<ChooseTop3 />}
                />

                <Route path="/about" element={<AboutPage />} />

                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

                <Route path="/cookies-policy" element={<CookiesPolicyPage />} />

                <Route
                    path="/terms-and-conditions"
                    element={<TermsAndConditionPage />}
                />

                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
