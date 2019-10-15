let greeting = "Hi";
let signature = "Best,\n\nTechnology Services\n";

let templates = [
    {
        title:"Awaiting Information",
        message:"This is a follow-up email. Has your issue been resolved? For now, we are going to close your ticket. \n\nHowever, if your issue has not been resolved, please let us know by either replying back to this email or by calling us at 217-244-7000. When calling, please tell the consultant your ticket number. Ticket number assigned to you is R*******."
    },
    {
        title:"Phishing Email Report",
        message:"Thank you for reporting this email. We can confirm that this is a phishing email designed to get you to give up your password. Our security team is aware of this and is working on a response at this time. Please delete the email and do not click on the link. If you have already clicked on it, please reset your password right away."
    },
    {
        title:"Spam Email",
        message:"Thank you for your email. This is in fact a spam email. Please do not click on any links associated with this email or attachments. Please visit: https://answers.uillinois.edu/illinois/50007 and follow the steps on forwarding this email to our spam email box.\n\nIn addition, this page will also answer any question you may have about spam mail: https://answers.uillinois.edu/systemoffices/57808"
    },
    {
        title:"Travel Scramble",
        message:"The Technology Services Security Team resets/scrambles passwords any time they detect account behavior that fits a pattern of abuse. The behavior that triggered this password scramble included logins within a short amount of time from widely separated geographical locations. Some suggestions to prevent your password being scrambled in the future when travelling abroad: \n\n1) Make sure you use the University's Cisco Anyconnect VPN available on the Webstore and not a 3rd party vendor.\n2) If you do decide to use a different VPN or a proxy server, you should avoid logging into University services.\n3) Do not share your credentials with anyone else (friends, family members, etc)\n4) Make sure you have your recovery options set at https://identity.uillinois.edu\n\nHere is the link to use University Cisco Anyconnect VPN: https://answers.uillinois.edu/illinois/page.php?id=63517 You can reset your password via your recovery options at https://identity.uillinois.edu and clicking on \"I forgot my password\" and following the steps to reset your password. If you are still having trouble after resetting your password or you are unable to use your self-recovery options, please let us know and we will troubleshoot the problem.\n\nIf you still believe you were scrambled in error, please let us know."
    },
    {
        title:"Invalid netID or Password",
        message:"The invalid NetID or Password error could be caused by a few different things. The first thing you should do is make sure that your NetID is typed in all lowercase characters. If you have capital letters in your NetID, it can sometimes cause this issue.\n\nIf you've verified that your NetID is all in lowercase, the next step would be to open a private browsing or incognito window and go back to the website that you were getting this error on in that private browsing window and try to login again (You may find instructions for this at //answers.uillinois.edu/systemoffices/page.php?id=87795 ). If you can successfully log into the system in the private browsing window, this means you have an old password that is saved in the browser. You can resolve this by clearing your cache/cookies for that browser. I'll include a link below that can help guide you through this process:\n\nhttps://answers.uillinois.edu/systemoffices/login-help\n\nShould this not work to resolve the login issue please let us know by responding back to this message.\n\nPlease kindly include the following information when responding:\nWhat is the URL/Application you are attempting login to? Please include the full URL if possible.\nWhat is the exact error message you receive? You may screenshot this and attach it with your reply."
    }
];