export const getQuizData = (option) => {
    if(option === 'Abuse Detection'){
return {
    questions: [
      {
        question: "What is abuse as defined under 55 PA Code Chapter 6100?",
        options: [
            "Playful teasing",
            "Unintentional harm",
           "Deliberate mistreatment that causes harm",
           "Light discipline",
        ],
        correct: "Deliberate mistreatment that causes harm"
      },
      {
        question: "Which of the following is a form of abuse?",
        options: [
        "Encouragement",
         "Financial exploitation",
          "Teaching skills",
          "Positive reinforcement",
        ],
        correct:  "Financial exploitation"
      },
      {
        question: `You are a mandated reporter. What does that mean?`,
        options: [
          `You can report only if you're sure`,
          `You report only to family members`,
          `You are required by law to report any suspected or alleged abuse`,
          `Only managers must report`
        ],
        correct: `You are required by law to report any suspected or alleged abuse`
      },
      {
        question: `What should you do if you suspect abuse?`,
        options: [
          `Ignore it if it’s not your client`,
          `Investigate it yourself`,
          `Immediately report per agency policy`,
          `Wait until your next shift`
        ],
        correct: `Immediately report per agency policy`
      },
      {
        question: `Which of the following is a sign of abuse?`,
        options: [
          `Frequent laughter`,
          `Active participation`,
          `Unexplained bruises or fearful behavior`,
          `Regular hygiene`
        ],
        correct: `Unexplained bruises or fearful behavior`
      },
      {
        question: `When must you report suspected abuse?`,
        options: [
        "Within 3 days",
        "By the end of the week",
        "Immediately or within 24 hours depending on policy",
        "After asking others first"
        ],
        correct: `Immediately or within 24 hours depending on policy`
      },
      {
        question: `What is something you should NOT do when responding to alleged abuse?`,
        options: [
        "Ensure safety",
        "Notify supervisor",
       "Start your own investigation",
        "Document the facts",
        ],
        correct:"Start your own investigation"
      },
      {
        question: `Which statement supports abuse prevention?`,
        options: [
        "Promote respect and safety in all interactions",
        "Ignore minor incidents",
        "Let individuals handle things alone",
        "Speak only to coworkers"
        ],
        correct: "Promote respect and safety in all interactions"
      },
      {
        question: `Why is failure to report abuse serious?`,
        options: [
        "It can lead to serious harm or death",
        "It’s okay if accidental",
        "It rarely causes issues",
        "Others will report it"
        ],
        correct: "It can lead to serious harm or death"
      },
      {
        question: `What is one way to empower individuals and prevent abuse?`,
        options: [
         "Control all their choices",
          "Discourage complaints",
          "Encourage self-advocacy and support their voice",
          "Keep things secret"
        ],
        correct: "Encourage self-advocacy and support their voice"
      }
    ]
    }
  
  }else if(option === 'Person Centered'){
    return {
      questions: [
        {
          question: `What is the core goal of person-centered practices?`,
          options: [
            "Getting tasks done quickly",
            "Meeting agency quotas",
            "Centering planning around the individual’s needs and preferences",
            "Avoiding risk"
          ],
          correct: "Centering planning around the individual’s needs and preferences"
        },
        {
          question: `Which of the following reflects person-centered thinking?`,
          options: [
           "This is how we always do it.",
           "Let’s ask the individual what they want.",
           "The team knows best.",
           "Just follow the standard routine."
          ],
          correct:  "Let’s ask the individual what they want."
        },
        {
          question: `What does 'important to' refer to in a person-centered plan?`,
          options: [
            "Medical appointments",
            "Things others want for the person",
            "What makes the person happy and satisfied in life",
            "Staff assignments"
          ],
          correct: "What makes the person happy and satisfied in life"
        },
        {
          question: `Which of the following is an example of supporting choice?`,
          options: [
            "Telling someone what they must do",
            "Offering options for how to spend their day",
            "Making all the decisions for the person",
            "Avoiding difficult discussions"
          ],
          correct: "Offering options for how to spend their day"
        },
        {
          question: `What is the role of a direct support professional in person-centered practices?`,
          options: [
           "Speak for the person",
           "Enforce routines",
           "Support and advocate for the individual’s choices and goals",
           "Make decisions without consultation"
          ],
          correct: "Support and advocate for the individual’s choices and goals"
        },
        {
          question: `How should differences in communication styles be addressed?`,
          options: [
            "Ignore them",
            "Use only verbal communication",
            "Support each person’s preferred communication method",
            "Avoid learning new styles"
          ],
          correct: "Support each person’s preferred communication method"
        },
        {
          question: `Which principle is NOT part of person-centered practices?`,
          options: [
            "Respect",
            "Inclusion",
            "Control by staff",
            "Choice"
          ],
          correct:  "Control by staff"
        },
        {
          question: `What should you do if a person wants to try something risky?`,
          options: [
            "Say no immediately",
            "Encourage and plan safe ways to support the choice",
            "Remove the option",
            "Redirect them"
          ],
          correct: "Encourage and plan safe ways to support the choice"
        },
        {
          question: `Why is cultural respect important in person-centered planning?`,
          options: [
            "It keeps things simple",
            "It’s required for legal compliance only",
            "It honors the individual’s identity and values",
            "It replaces the ISP"
          ],
          correct: "It honors the individual’s identity and values"
        },
        {
          question: `What is the most person-centered response to 'Can I go to the store today?'`,
          options: [
            "No, it’s not scheduled",
            "Maybe later",
            " Let’s see how we can support that!",
            "You don’t need anything"
          ],
          correct: " Let’s see how we can support that!"
        },
      ],
    };
}else if(option === 'Individual Rights'){
  return {
      questions: [
        {
          question: `What is the purpose of the 55 PA Code Chapter 6100 regulations?`,
          options: [
            "To assign job tasks to staff",
            "To protect the rights of individuals receiving services",
            "To limit choices",
            "To replace ISPs"
          ],
          correct: "To protect the rights of individuals receiving services"
        },
        {
          question: `Which of the following is a basic right of individuals receiving services?`,
          options: [
            "To be ignored during care",
            "To choose what they eat and wear",
            "To follow the staff’s rules only",
            "To give up their vote"
          ],
          correct: "To choose what they eat and wear"
        },
        {
          question: `What does dignity and respect mean in service delivery?`,
          options: [
            "Allowing personal choice and treating individuals as equals",
            "Ignoring complaints",
            "Giving orders to ensure compliance",
            "Always agreeing with the family"
          ],
          correct: "Allowing personal choice and treating individuals as equals"
        },
        {
          question: `Which action violates confidentiality?`,
          options: [
            "Keeping records secure",
            "Discussing someone’s diagnosis in public",
            "Using initials in public notes",
            "Locking up files"
          ],
          correct: "Discussing someone’s diagnosis in public"
        },
        {
          question: `If someone refuses an activity in their ISP, what should you do?`,
          options: [
            "Force them to comply",
            "Offer other options and document the refusal",
            "Punish them for non-compliance",
            "Skip the rest of the shift"
          ],
          correct: "Offer other options and document the refusal"
        },
        {
          question: `Who has the right to report suspected abuse or neglect?`,
          options: [
            "Only supervisors",
            "Mandated reporters only",
            "Everyone, and staff must report immediately",
            "Friends and family only"
          ],
          correct: "Everyone, and staff must report immediately"
        },
        {
          question: `What is an example of supporting informed choice?`,
          options: [
            "Deciding what’s best for the individual",
            "Offering options with explanations",
            "Ignoring their preferences",
            "Only asking once"
          ],
          correct: "Offering options with explanations"
        },
        {
          question: `Which of these is an individual’s right under 6100?`,
          options: [
                "To vote",
                "To access religious services",
                "To have visitors",
                "All of the above"
          ],
          correct: "To have visitors"
        },
        {
          question: `What should you do if a person’s rights are being violated?`,
          options: [
            "Say nothing",
            "Talk to the person violating them",
            "Report the incident per policy immediately",
            "Write about it later"
          ],
          correct: "Report the incident per policy immediately"
        },
        {
          question: `What is your responsibility as a staff member regarding rights?`,
          options: [
            "To know them, protect them, and empower individuals",
            "To enforce house rules only",
            "To avoid rights discussions",
            "To report only serious violations"
          ],
          correct: "To know them, protect them, and empower individuals"
        }
      ],
    };
}else if(option === 'Recognizing and Reporting Incident'){
  return {
      questions: [
        {
          question: `What is a reportable incident under 55 PA Code Chapter 6100?`,
          options: [
            "A staff member running late",
            "A small disagreement",
            "Abuse, neglect, or injury requiring medical treatment",
            "A schedule change"
          ],
          correct:  "Abuse, neglect, or injury requiring medical treatment"
        },
        {
          question: `What should you do first if you witness an incident?`,
          options: [
            "Call a friend",
            "Ensure the individual is safe",
            "Wait until your supervisor arrives",
            "Post about it online"
          ],
          correct: "Ensure the individual is safe"
        },
        {
          question: `Which of the following must be included in an incident report?`,
          options: [
            "Your opinion",
            "Only the person's first name",
            "Who, what, when, where, and how",
            "What coworkers said"
          ],
          correct: "Who, what, when, where, and how"
        },
        {
          question: `When should you report an incident?`,
          options: [
            "At the end of the month",
            "Immediately or within the timeframe set by agency policy",
            "After the team meeting",
            "If others agree"
          ],
          correct: "Immediately or within the timeframe set by agency policy"
        },
        {
          question: `What does being a mandated reporter mean?`,
          options: [
           "You report only if someone tells you to",
            "You must report suspected or actual incidents of abuse or serious harm",
            "You can decide whether to report",
            "Only supervisors report"
          ],
          correct: "You must report suspected or actual incidents of abuse or serious harm"
        },
        {
          question: `Which of the following is a red flag for potential abuse or neglect?`,
          options: [
                "Smiling often",
                "Wearing clean clothes",
                "Flinching when approached",
                "Having hobbies"
          ],
          correct: "Flinching when approached"
        },
        {
          question: `What is one reason why some staff fail to report incidents?`,
          options: [
            "Too much support",
            "Fear of retaliation or misunderstanding the process",
            "Being praised for honesty",
            "They want to fill out paperwork"
          ],
          correct: "Fear of retaliation or misunderstanding the process"
        },
        {
          question: `What can happen if you fail to report a serious incident?`,
          options: [
            "Nothing",
            "The problem solves itself",
            "Legal consequences and harm to the individual",
            "You get promoted"
          ],
          correct: "Legal consequences and harm to the individual"
        },
        {
          question: `What should you avoid when writing an incident report?`,
          options: [
           "Using clear facts",
           "Including the date and time",
           "Including your opinion or assumptions",
           "Reporting within 24 hours"
          ],
          correct: "Including your opinion or assumptions"
        },
        {
          question: `What is the goal of incident reporting?`,
          options: [
            "To punish staff",
            "To get people fired",
            "To protect individuals and improve safety",
            "To avoid accountability"
          ],
          correct: "To protect individuals and improve safety"
        },
      ],
    };
}
};

// export const HodgetQuizData = (option) => {
// switch (option){
//   case "Abuse, Neglect and Mandated Reporting" :
//     return{
//       questions: [
//        {
//         question: "What is considered physical abuse?",
//         options: [
//           "Ignoring someone’s question",
//           "Making a joke about a person",
//           "Hitting or pushing someone",
//           "Forgetting to bring someone to an appointment",
//         ],
//         correct: "Hitting or pushing someone",
//       },
//       {
//         question: "Which of the following is a sign of emotional abuse?",
//         options: [
//           "Dirty clothing",
//           "Refusing to eat vegetables",
//           "Fearfulness and withdrawal",
//           "Falling asleep in public",
//         ],
//         correct: "Fearfulness and withdrawal",
//       },
//       {
//         question: "Neglect can be defined as:",
//         options: [
//           "Choosing not to engage socially",
//           "Failure to provide necessary care or supervision",
//           "Taking someone’s money",
//           "A preference for privacy",
//         ],
//         correct: "Failure to provide necessary care or supervision",
//       },
//       {
//         question: "Mandated reporters must report suspected abuse:",
//         options: [
//           "Only if it’s confirmed",
//           "At their next team meeting",
//           "Immediately",
//           "After discussing with family",
//         ],
//         correct: "Immediately",
//       },
//       {
//         question: "True or False: Staff are required to report suspected abuse to their supervisor only.",
//         options: ["True", "False"],
//         correct: "False",
//       },
//       {
//         question: "Which of the following could be sexual abuse?",
//         options: [
//           "Offering help with dressing",
//           "Making jokes about someone’s appearance",
//           "Inappropriate touching or coercion",
//           "Explaining hygiene to someone",
//         ],
//         correct: "Inappropriate touching or coercion",
//       },
//       {
//         question: "What is one correct way to report abuse?",
//         options: [
//           "Post about it online",
//           "Call ChildLine or Protective Services",
//           "Talk to a friend at lunch",
//           "Wait until your shift ends",
//         ],
//         correct: "Call ChildLine or Protective Services",
//       },
//       {
//         question: "Failure to report abuse may result in:",
//         options: [
//           "A promotion",
//           "No consequences",
//           "Legal action or job loss",
//           "A verbal warning",
//         ],
//         correct: "Legal action or job loss",
//       },
//       {
//         question: "A person shows bruises and seems withdrawn. You should:",
//         options: [
//           "Ignore it and give space",
//           "Report it immediately",
//           "Ask other staff what to do later",
//           "Wait to see if it happens again",
//         ],
//         correct: "Report it immediately",
//       },
//       {
//         question: "Creating a culture of safety means:",
//         options: [
//           "Staying silent about concerns",
//           "Respecting every person and speaking up for their rights",
//           "Only following instructions",
//           "Avoiding extra responsibilities",
//         ],
//         correct: "Respecting every person and speaking up for their rights",
//       },
//     ]
//     }
//     case "Cultural Competency and Disability Awareness":
//       return{
//          questions: [
//          {
//         question: "What is cultural competence?",
//         options: [
//           "Knowing how to cook international food",
//           "Understanding and respectfully responding to cultural differences",
//           "Speaking multiple languages",
//           "Memorizing all cultures' customs",
//         ],
//         correct: "Understanding and respectfully responding to cultural differences",
//       },
//       {
//         question: "What does it mean to view disability as a cultural identity?",
//         options: [
//           "Ignoring the disability",
//           "Recognizing that disability can be a meaningful part of someone’s identity and community",
//           "Treating everyone the same",
//           "Always speaking for the person",
//         ],
//         correct: "Recognizing that disability can be a meaningful part of someone’s identity and community",
//       },
//       {
//         question: "Which of the following is a respectful way to refer to someone?",
//         options: [
//           "Handicapped person",
//           "Autistic",
//           "Person with a disability",
//           "Crippled",
//         ],
//         correct: "Person with a disability",
//       },
//       {
//         question: "Why is cultural competence important in ODP services?",
//         options: [
//           "To meet quotas",
//           "To avoid personal conversations",
//           "To increase respectful, effective support",
//           "To make things more complicated",
//         ],
//         correct: "To increase respectful, effective support",
//       },
//       {
//         question: "True or False: Everyone has bias, but we can learn to recognize and challenge it.",
//         options: ["True", "False"],
//         correct: "True",
//       },
//       {
//         question: "How should you respond if you unintentionally offend someone culturally?",
//         options: [
//           "Defend yourself",
//           "Ignore it",
//           "Apologize, ask questions, and adjust your approach",
//           "Tell them it wasn’t your fault",
//         ],
//         correct: "Apologize, ask questions, and adjust your approach",
//       },
//       {
//         question: "What is one way to be inclusive of diverse cultural and disability identities?",
//         options: [
//           "Treat everyone identically",
//           "Ask before helping and respect preferences",
//           "Avoid learning about cultural holidays",
//           "Assume what works best for them",
//         ],
//         correct: "Ask before helping and respect preferences",
//       },
//       {
//         question: "What does person-first language mean?",
//         options: [
//           "Putting the diagnosis first in the sentence",
//           "Using nicknames",
//           "Referring to the individual before their disability",
//           "Talking slower",
//         ],
//         correct: "Referring to the individual before their disability",
//       },
//       {
//         question: "What should you do if someone doesn’t speak your language?",
//         options: [
//           "Ignore them",
//           "Shout louder",
//           "Find a way to communicate clearly using supports",
//           "Tell them to speak English",
//         ],
//         correct: "Find a way to communicate clearly using supports",
//       },
//       {
//         question: "Which of these is an example of inclusive practice?",
//         options: [
//           "Only celebrating mainstream holidays",
//           "Ignoring food preferences",
//           "Displaying diverse images and adapting routines to individual needs",
//           "Using one-size-fits-all approaches",
//         ],
//         correct: "Displaying diverse images and adapting routines to individual needs",
//       },
//       ],
//     }
//     case 'De-escalation and Behavioral Support Techniques':
//       return{
//         questions: [
//  {
//         question: "Behavior is often a form of:",
//         options: ["Disrespect", "Communication", "Defiance", "Disobedience"],
//         correct: "Communication",
//       },
//       {
//         question: "What is the first stage of escalation?",
//         options: ["Trigger", "Peak", "Calm", "Recovery"],
//         correct: "Calm",
//       },
//       {
//         question: "Which strategy is proactive, not reactive?",
//         options: [
//           "Giving warnings",
//           "Offering choices",
//           "Arguing back",
//           "Physical intervention",
//         ],
//         correct: "Offering choices",
//       },
//       {
//         question: "What should your tone of voice be during de-escalation?",
//         options: ["Loud and firm", "Sarcastic", "Calm and soft", "Emotionless"],
//         correct: "Calm and soft",
//       },
//       {
//         question:
//           "True or False: All staff must use the same tone and volume when supporting everyone.",
//         options: ["True", "False"],
//         correct: "False",
//       },
//       {
//         question: "Which is a nonverbal de-escalation strategy?",
//         options: [
//           "Pointing fingers",
//           "Making intense eye contact",
//           "Open body posture",
//           "Pacing around",
//         ],
//         correct: "Open body posture",
//       },
//       {
//         question: "During the peak of behavior, what’s the priority?",
//         options: ["Arguing your point", "Punishment", "Ensuring safety", "Completing tasks"],
//         correct: "Ensuring safety",
//       },
//       {
//         question: "What is a helpful response during the agitation stage?",
//         options: [
//           "Ignore the person",
//           "Offer a power struggle",
//           "Redirect or give space",
//           "Physically intervene",
//         ],
//         correct: "Redirect or give space",
//       },
//       {
//         question: "Why is debriefing important after an incident?",
//         options: [
//           "To blame someone",
//           "To correct documentation",
//           "To promote recovery and learning",
//           "To avoid accountability",
//         ],
//         correct: "To promote recovery and learning",
//       },
//       {
//         question: "Which of the following supports a positive environment?",
//         options: [
//           "Inconsistency",
//           "Yelling to get attention",
//           "Rigid control",
//           "Compassion and structure",
//         ],
//         correct: "Compassion and structure",
//       },
//         ]
//       }
//       case 'CPR and First Aid':
//       return{
//         questions: [
//            {
//         question: "What does CPR stand for?",
//         options: [
//           "Cardiac Pressure Response",
//           "Cardiopulmonary Resuscitation",
//           "Central Pressure Regulation",
//           "Cardiac Pulmonary Reaction",
//         ],
//         correct: "Cardiopulmonary Resuscitation",
//       },
//       {
//         question: "When should you begin CPR on someone?",
//         options: [
//           "When they fall asleep",
//           "When they are unresponsive and not breathing normally",
//           "When they trip and fall",
//           "When they’re talking slowly",
//         ],
//         correct: "When they are unresponsive and not breathing normally",
//       },
//       {
//         question: "What is the correct ratio of compressions to breaths during adult CPR?",
//         options: ["10:1", "50:2", "30:2", "15:5"],
//         correct: "30:2",
//       },
//       {
//         question: "What’s the first thing to do if you find someone unconscious?",
//         options: [
//           "Walk away",
//           "Check responsiveness and call 911",
//           "Shake them hard",
//           "Start CPR immediately",
//         ],
//         correct: "Check responsiveness and call 911",
//       },
//       {
//         question: "True or False: An AED can be used by anyone who follows the voice prompts.",
//         options: ["True", "False"],
//         correct: "True",
//       },
//       {
//         question: "What is the purpose of first aid?",
//         options: [
//           "To replace professional medical care",
//           "To delay treatment",
//           "To give immediate care until medical help arrives",
//           "To avoid legal issues",
//         ],
//         correct: "To give immediate care until medical help arrives",
//       },
//       {
//         question: "How should you respond to a choking adult?",
//         options: [
//           "Offer them a drink",
//           "Slap their back while seated",
//           "Perform abdominal thrusts (Heimlich)",
//           "Wait until they turn blue",
//         ],
//         correct: "Perform abdominal thrusts (Heimlich)",
//       },
//       {
//         question: "What should a well-stocked first aid kit include?",
//         options: [
//           "Toys and snacks",
//           "Gloves, gauze, antiseptic wipes, CPR mask",
//           "Water balloons",
//           "TV remote",
//         ],
//         correct: "Gloves, gauze, antiseptic wipes, CPR mask",
//       },
//       {
//         question: "After providing first aid, what’s the next step?",
//         options: [
//           "Forget about it",
//           "Document the incident and notify your supervisor",
//           "Go home early",
//           "Hide any used supplies",
//         ],
//         correct: "Document the incident and notify your supervisor",
//       },
//       {
//         question: "Which situation is appropriate for CPR?",
//         options: [
//           "The person is conscious but dizzy",
//           "The person is breathing slowly",
//           "The person has no pulse and is not breathing",
//           "The person is having a seizure",
//         ],
//         correct: "The person has no pulse and is not breathing",
//       },
//         ]
//       }

//   }
// }

